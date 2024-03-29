
let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

// Stores a level object
class Level {
    constructor(plan) {
        // Remove trailing whitespace and keep rows of the plan as an array
        let rows = plan.trim().split("\n").map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        // To create an array of background and actors
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                // levelChars maps background elements to strings and actor characters to classes
                let type = levelChars[ch];
                if (typeof type == "string") {
                    return type;
                }
                this.startActors.push(
                    // Create object for actors with position stored in the vector
                    type.create(new Vec(x, y), ch));
                return "empty";
            });
        });
    }
}

// Track the state of the running game
class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.startActors, "playing");
    }

    get player() {
        // Switch to "lost" or "won" when the game has ended
        return this.actors.find(a => a.type == "player");
    }
}

// Handles position and size of actors
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
}

// Handles player properties
class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() {
        return "player";
    }

    /* Since a player is one-and-a-half squares high, initial position is set to half a square above the position where the @ character appeared so that the bottom aligns with the bottom of the square it appeared in */
    static create(pos) {
        return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
    }
}
// Stored here since it is the same for all instances of Player
Player.prototype.size = new Vec(0.8, 1.5);

// Handles lava properties
class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() {
        return "lava";
    }

    static create(pos, ch) {
        if (ch == "=") {
            return new Lava(pos, new Vec(2, 0));
        } else if (ch == "|") {
            return new Lava(pos, new Vec(0, 2));
        } else if (ch == "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }
}
// Stored here since it is the same for all instances of Lava
Lava.prototype.size = new Vec(1, 1);

// Handles coin properties
class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type() {
        return "coin";
    };

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        // This creates random starting position on the wave
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
}
// Stored here since it is the same for all instances of coin
Coin.prototype.size = new Vec(0.6, 0.6);

// Maps the plan characters to either background grid types of actor classes
const levelChars = {
    ".": "empty",
    "#": "wall",
    "+": "lava",
    "@": Player,
    "o": Coin,
    "=": Lava,
    "|": Lava,
    "v": Lava
};


let simpleLevel = new Level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`); // -> 22 by 9



// Helper function to create elements and add attributes and child nodes
function elt(name, attrs, ...children) {
    let dom = document.createElement(name);

    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

// Create display interface using a parent element and a level object
class DOMDisplay {
    constructor(parent, level) {
        this.dom = elt("div", {class: "game"}, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear() {
        this.dom.remove();
    }
}

// Use to alter the number of pixels per unit on the screen
const SCALE = 20;

// Draws the grid per level
function drawGrid(level) {
    return elt("table", {
        class: "background",
        style: `width: ${level.width * SCALE}px`}, ...level.rows.map(row => elt("tr", {style: `height: ${SCALE}px`}, ...row.map(type => elt("td", {class: type}))))
    );
}

// Draws each actor
function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", {class: `actor ${actor.type}`});
        rect.style.width = `${actor.size.x * SCALE}px`;
        rect.style.height = `${actor.size.y * SCALE}px`;
        rect.style.left = `${actor.pos.x * SCALE}px`;
        rect.style.top = `${actor.pos.y * SCALE}px`;
        return rect;
    }));
}

//Make display show the given state
DOMDisplay.prototype.syncState = function(state) {
    if (this.actorLayer) {
        this.actorLayer.remove();
    }
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
};

// Finds player's position and updates wrapping element's scroll position
DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    // The viewport
    let left = this.dom.scrollLeft;
    let right = left + width;
    let top = this.dom.scrollTop;
    let bottom = top + height;

    let player = state.player;
    let centre = player.pos.plus(player.size.times(0.5)).times(SCALE);

    if (centre.x < left + margin) {
        this.dom.scrollLeft = centre.x - margin;
    } else if (centre.x > right - margin) {
        this.dom.scrollLeft = centre.x + margin - width;
    }
    if (centre.y < top + margin) {
        this.dom.scrollTop = centre.y - margin;
    } else if (centre.y > bottom - margin) {
        this.dom.scrollTop = centre.y + margin - height;
    }
};

simpleLevel = new Level(simpleLevelPlan);
let display = new DOMDisplay(document.body, simpleLevel);
display.syncState(State.start(simpleLevel));

/* Motion and Collision */

// Check if rectangle touches a grid element
Level.prototype.touches = function(pos, size, type) {
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
            let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
            let here = isOutside ? "wall" : this.rows[y][x];
            if (here == type) {
                return true;
            }
        }
    }
    return false;
};

// Detect if the player is touching lava via touches
State.prototype.update = function (time, keys) {
    let actors = this.actors.map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status != "playing") {
        return newState;
    }

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
        return new State(this.level, actors, "lost");
    }

    for (let actor of actors) {
        if (actor != player && overlap(actor, player)) {
            newState = actor.collide(newState);
        }
    }
    return newState;
};

// Detects if two actors touch
function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x && actor1.pos.x < actor2.pos.x + actor2.size.x && actor1.pos.y + actor1.size.y > actor2.pos.y && actor1.pos.y < actor2.pos.y + actor2.size.y;
}

// Mark game as lost if collision with lava occurs
Lava.prototype.collide = function(state) {
    return new State(state.level, state.actors, "lost");
};

// Vanish coins when touched
Coin.prototype.collide = function(state) {
    let filtered = state.actors.filter(a => a != this);
    let status = state.status;
    if (!filtered.some(a => a.type == "coin")) {
        status = "won";
    }
    return new State(state.level, filtered, status);
};

// Updating the interaction between lava and actors
Lava.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
        return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
        return new Lava(this.reset, this.speed, this.reset);
    } else {
        return new Lava(this.pos, this.speed.times(-1));
    }
};

// Updating the interaction between coin and actors
const wobbleSpeed = 8;
const wobbleDist = 0.07;

Coin.prototype.update = function(time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
};

// Handling player motion
const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
    // Horizontal speed handling
    let xSpeed = 0;
    if (keys.ArrowLeft) {
        xSpeed -= playerXSpeed;
    }
    if (keys.ArrowRight) {
        xSpeed += playerXSpeed;
    }
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level,touches(movedX, this.size, "wall")) {
        pos = movedX;
    }

    // Vertical speed handling
    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level,touches(movedY, this.size, "wall")) {
        pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
        ySpeed -= jumpSpeed;
    } else {
        ySpeed = 0;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
};

/* Tracking Keys */

// Keeps track of keys states and events
function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type === "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);


/* Running The Game */

// Helper function for requestAnimationFrame
function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) == false) {
                return;
            }
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    removeEventListener(frame);
}

// Takes a Level object and a display constructor to return a promise
function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    return new Promise(resolve => {
        runAnimation(time => {
            state = state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
    });
}

// Handling the game levels
async function runGame(plans, Display) {
    for (let level = 0; level < plans.length;) {
        let status = await runLevel(new Level(plans[level]), Display);
        if (status == "won") {
            level++;
        }
    }
    console.log("You have won!");
}

runGame(GAME_LEVELS, DOMDisplay);

