/* On most browsers, when you select the draw tool and quickly drag across the picture, you don’t get a closed line. Rather, you get dots with gaps between them because the "mousemove" or "touchmove" events did not fire quickly enough to hit every pixel.
Improve the draw tool to make it draw a full line. This means you have to make the motion handler function remember the previous position and connect that to the current one.
To do this, since the pixels can be an arbitrary distance apart, you’ll have to write a general line drawing function.
A line between two pixels is a connected chain of pixels, as straight as possible, going from the start to the end. Diagonally adjacent pixels count as a connected. So a slanted line should look like the picture on the left, not the picture on the right.
Finally, if we have code that draws a line between two arbitrary points, we might as well use it to also define a line tool, which draws a straight line between the start and end of a drag.
*/

/* The State */

const editorElement = document.getElementById("editor");

class Picture {
    constructor(width, height, pixels) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }
    static empty(width, height, color) {
        let pixels = new Array(width * height).fill(color);
        return new Picture(width, height, pixels);
    }
    pixel(x, y) {
        return this.pixels[x + y * this.width];
    }
    draw(pixels) {
        let copy = this.pixels.slice();
        for (let {x, y, color} of pixels) {
            copy[x + y * this.width] = color;
        }
        return new Picture(this.width, this.height, copy);
    }
}

// Function allows previous state to be overwritten during update
function updateState(state, action) {
    // return Object.assign({}, state, action);
    // Spread operator can now be used
    return Object.assign({...state, ...action});
}


/* DOM Building */

// Expanded elt function to create DOM elements
function elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) {
        Object.assign(dom, props);
    }
    for (let child of children) {
        if (typeof child != "string") {
            dom.appendChild(child);
        } else {
            dom.appendChild(document.createTextNode(child));
        }
    }
    return dom;
}


/* The Canvas */

const scale = 10;

class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt("canvas", {
            onmousedown: event => this.mouse(event, pointerDown), ontouchstart: event => this.touch(event, pointerDown)
        });
        this.syncState(picture);
    }
    // Change this method to partially solve the exercise
    syncState(picture) {
        // Prevents redraw if no change is made
        if (this.picture == picture) {
            return;
        }
        drawPicture(picture, this.dom, scale, this.picture,);
        this.picture = picture;
    }
}

// Function to actually draw the picture on the canvas
function drawPicture(picture, canvas, scale, previousPicture) {
    if (previousPicture == null || previousPicture.width != picture.width || previousPicture.height != picture.height) {
        canvas.width = picture.width * scale;
        canvas.height = picture.height * scale;
        previousPicture = null;
    }
    
    let cx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            let color = picture.pixel(x, y);
            if (previousPicture == null || previousPicture.pixel(x, y) != color) {
                cx.fillStyle = color;
                cx.fillRect(x * scale, y * scale, scale, scale);
            }
        }
    }
}

// Updating with mousedown events
PictureCanvas.prototype.mouse = function(downEvent, onDown) {
    if (downEvent.button != 0) {
        return;
    }
    let pos = pointerPosition(downEvent, this.dom);
    let onMove = onDown(pos);
    if (!onMove) {
        return;
    }
    let move = moveEvent => {
        if (moveEvent.buttons == 0) {
            this.dom.removeEventListener("mousemove", move);
        } else {
            let newPos = pointerPosition(moveEvent, this.dom);
            if (newPos.x == pos.x && newPos.y == pos.y) {
                return;
            }
            pos = newPos;
            onMove(newPos);
        }
    };
    this.dom.addEventListener("mousemove", move);
};

// Detecting pointer position
function pointerPosition(pos, domNode) {
    let rect = domNode.getBoundingClientRect();
    return {x: Math.floor((pos.clientX - rect.left) / scale), y: Math.floor((pos.clientY - rect.top) / scale)};
}

// Handling touch events
PictureCanvas.prototype.touch = function(startEvent, onDown) {
    let pos = pointerPosition(startEvent.touches[0], this.dom);
    let onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) {
        return;
    }
    let move = moveEvent => {
        let newPos = pointerPosition(moveEvent.touches[0], this.dom);
        if (newPos.x == pos.x && newPos.y == pos.y) {
            return;
        }
        pos = newPos;
        onMove(newPos);
    };
    let end = () => {
        this.dom.removeEventListener("touchmove", move);
        this.dom.removeEventListener("touchend", end);
    };
    this.dom.addEventListener("touchmove", move);
    this.dom.addEventListener("touchend", end);
};


/* The Application */

// The original PixelEditor class. Extend the constructor to solve the exercise.
class PixelEditor {
    constructor(state, config) {
        let {tools, controls, dispatch} = config;
        this.state = state;
        // Handles the currently selected tool with the right arguments
        this.canvas = new PictureCanvas(state.picture, pos => {
            let tool = tools[this.state.tool];
            let onMove = tool(pos, this.state, dispatch);
            if (onMove) {
                return pos => onMove(pos, this.state);
            }
        });
        // Constructs and stores all controls with reduce() adding spaces between them
        this.controls = controls.map(
            Control => new Control(state, config));
            // Make use of the previously empty object to pass in the tabIndex
            this.dom = elt("div", {
                tabIndex: 0,
                onkeydown: event => {
                    let shortcut = Object.keys(tools).find(tool => tool[0] == event.key);
                    if ((event.ctrlKey || event.metaKey) && event.key.match("[zZ]")) {
                        event.preventDefault();
                        dispatch({"tool": shortcut});
                    }
                }
            }, this.canvas.dom, elt("br"), ...this.controls.reduce((a, c) => a.concat(" ", c.dom), []));
    }

    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (let ctrl of this.controls) {
            ctrl.syncState(state);
        }
    }
}

// Tool selection
class ToolSelect {
    constructor(state, {tools, dispatch}) {
        this.select = elt("select", {
            onchange: () => dispatch({tool: this.select.value})
        }, ...Object.keys(tools).map(name => elt("option", {selected: name == state.tool}, name)));
        this.dom = elt("label", null, "🖌 Tool: ", this.select);
    }
    syncState(state) { this.select.value = state.tool; }
}

// Colour picking
class ColorSelect {
    constructor(state, {dispatch}) {
        this.input = elt("input", {
            type: "color",
            value: state.color,
            onchange: () => dispatch({color: this.input.value})
        });
        this.dom = elt("label", null, "🎨 Color: ", this.input);
    }
    syncState(state) { this.input.value = state.color; }
}


/* Drawing Tools */
// Implement draw tool
/***************************************/
/* Rewrite this to solve the exercise */
/*************************************/

function drawSmooth(start, end, color) {
    // Store the previous coordinates
    let points = [];
    if (Math.abs(start.x - end.x) > Math.abs(start.y - end.y)) {
        // Swap values if movement is backwards or downwards
        if (start.x > end.x) {
            [start, end] = [end, start];
        }
        let slope = (end.y - start.y) / (end.x - start.x);
        for (let {x, y} = start; x <= end.x; x++) {
            points.push({x, y: Math.round(y), color});
            y += slope;
        }
    } else {
        if (start.y > end.y) {
            [start, end] = [end, start];
            let slope = (end.x - start.x) / (end.y - start.y);
            for (let {x, y} = start; y <= end.y; y++) {
                points.push({x: Math.round(x), y, color});
                x += slope;
            }
        }
    }
    return points;
}

function draw(pos, state, dispatch) {
    function drawSmoothPixel(newPos, state) {
        let smooth = drawSmooth(newPos, state.color);
        pos = newPos;
        dispatch({picture: state.picture.draw(smooth)});
    }
    drawSmoothPixel(pos, state);
    return drawSmoothPixel;
}

// Then create a line tool function
function line(pos, state, dispatch) {
    return end => {
        let line = drawSmooth(pos, end, state.color);
        dispatch({picture: state.picture.draw(line)});
    };
}


// Implement rectangle tool
function rectangle(start, state, dispatch) {
    function drawRectangle(pos) {
        let xStart = Math.min(start.x, pos.x);
        let yStart = Math.min(start.y, pos.y);
        let xEnd = Math.max(start.x, pos.x);
        let yEnd = Math.max(start.y, pos.y);
        let drawn = [];
        for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
                drawn.push({x, y, color: state.color})
            }
        }
        dispatch({picture: state.picture.draw(drawn)});
    }
    drawRectangle(start);
    return drawRectangle;
}

// Implement circle tool
function circle(pos, state, dispatch) {
    function drawCircle(dest) {
        /* Area circle = PI * (radius ^ 2)
            radius = sqrt(area / PI)
            circumference = 2 * PI * radius
            diameter = 2 * radius
        */
        let rp = Math.sqrt(Math.pow((dest.x - pos.x), 2) + Math.pow((dest.y - pos.y), 2));
        let radiusPI = Math.ceil(rp);
        let drawn = [];
        for (let dy = -radiusPI; dy <= radiusPI; dy++) {
            for (let dx = -radiusPI; dx <= radiusPI; dx++) {
                let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                // Ensure distance does not exceed the radius
                if (distance > radiusPI) {
                    continue;
                }
                let y = pos.y + dy;
                let x = pos.x + dx;
                // Ensure circle does not exceed the canvas bounds.
                if (y < 0 || y >= state.picture.height || x < 0 || x >= state.picture.width) {
                    continue;
                }
                drawn.push({x, y, color: state.color});
            }
        }
        dispatch({picture: state.picture.draw(drawn)});
    }
    drawCircle(pos);
    return drawCircle;
}

// Implement flood colour filling
const around = [
    {dx: -1, dy: 0},
    {dx: 1, dy: 0},
    {dx: 0, dy: -1},
    {dx: 0, dy: 1},
];

function fill({x, y}, state, dispatch) {
    let targetColour = state.picture.pixel(x, y);
    let drawn = [{x, y, color: state.color}];
    for (let done = 0; done < drawn.length; done++) {
        for (let {dx, dy} of around) {
            let x = drawn[done].x + dx;
            let y = drawn[done].y + dy;
            if ((x >= 0 && x < state.picture.width) && (y >= 0 && y < state.picture.height) && (state.picture.pixel(x, y) == targetColour) && (!drawn.some(p => p.x == x && p.y == y))) {
                drawn.push({x, y, color: state.color});
            }
        }
    }
    dispatch({picture: state.picture.draw(drawn)});
}

// Implement colour picker
function pick(pos, state, dispatch) {
    dispatch({color: state.picture.pixel(pos.x, pos.y)});
}

/* Saving and Loading */

// Implement means to save and download the edited work
class SaveButton {
    constructor(state) {
        this.picture = state.picture;
        this.dom = elt("button", {onclick: () => this.save()}, "💾 Save");
    }
    save() {
        let canvas = elt("canvas");
        drawPicture(this.picture, canvas, 1);
        let link = elt("a", {href: canvas.toDataURL(), download: "pixelart.png"});
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    syncState(state) { this.picture = state.picture; }
}

// Load existing images into the application
class LoadButton {
    constructor(_, {dispatch}) {
        this.dom = elt("button", {onclick: () => startLoad(dispatch)}, "📁 Load")
    }
    syncState() {}
}

// Linked to load button to prevent URL typing
function startLoad(dispatch) {
    let input = elt("input", {
        type: "file",
        onchange: () => finishLoad(input.files[0], dispatch)
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
}

// Linked to startLoad() also
function finishLoad(file, dispatch) {
    if (file == null) {
        return;
    }
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        let image = elt("img", {onload: () => dispatch({
            picture: pictureFromImage(image)
        }), src: reader.result});
    });
    reader.readAsDataURL(file);
}

// Need to draw picture on canvas element before accessing
function pictureFromImage(image) {
    let width = Math.min(100, image.width);
    let height = Math.min(100, image.height);
    let canvas = elt("canvas", {width, height});
    let cx = canvas.getContext("2d");
    cx.drawImage(image, 0, 0);
    let pixels = [];
    let {data} = cx.getImageData(0, 0, width, height);

    function hex(n) {
        return n.toString(16).padStart(2, "0");
    }
    for (let i = 0; i < data.length; i += 4) {
        let [r, g, b] = data.slice(i, i + 3);
        pixels.push("#" + hex(r) + hex(g) + hex(b));
    }
    return new Picture(width, height, pixels);
}


/* Undo History */

// Store previous states to enable possible rollback
function historyUpdateState(state, action) {
    if (action.undo == true) {
        if (state.done.length == 0) {
            return state;
        }
        return Object.assign({}, state, {
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0
        });
    } else if (action.picture && state.doneAt < Date.now() - 1000) {
        return Object.assign({}, state, {
            done: [state.picture, ...state.done],
            doneAt: Date.now()
        });
    } else {
        return Object.assign({}, state, action);
    }
}

// Implement dispatching of undo actions
class UndoButton {
    constructor(state, {dispatch}) {
        this.dom = elt("button", {onclick: () => dispatch({undo: true}), disabled: state.done.length == 0}, "⮪ Undo");
    }
    syncState(state) {
        this.dom.disabled = state.done.length == 0;
    }
}


/* Let Us Draw */
const startState = {
    tool: "draw",
    colour: "#000000",
    picture: Picture.empty(60, 30, "#f0f0f0"),
    done: [],
    doneAt: 0
};

const baseTools = {draw, fill, rectangle, pick};

const baseControls = [ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton];

function startPixelEditor({state = startState, tools = baseTools, controls = baseControls}) {
    let app = new PixelEditor(state, {
        tools,
        controls,
        dispatch(action) {
            state = historyUpdateState(state, action);
            app.syncState(state);
        }
    });
    return app.dom;
}

/* 
let domCircle = startPixelEditor({
    tools: Object.assign({}, baseTools, {circle})
});
 */
// document.querySelector("div").appendChild(dom);
// editorElement.appendChild(domCircle);
// document.querySelector("div").appendChild(startPixelEditor({}));

let dom = startPixelEditor({
    tools: {draw, line, fill, rectangle, pick, circle}
});
editorElement.appendChild(dom);
