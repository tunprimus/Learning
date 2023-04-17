//

let circle = document.querySelector("circle");
circle.setAttribute("fill", "cyan");

/* The Canvas Element */

let canvas = document.querySelectorAll("canvas")[0];
let context = canvas.getContext("2d");
context.fillStyle = "red";
context.fillRect(10, 10, 100, 50);

/* Lines and Surfaces */

let cx = document.querySelectorAll("canvas")[1].getContext("2d");
cx.strokeStyle = "blue";
cx.strokeRect(5, 5, 50, 50);
cx.lineWidth = 5;
cx.strokeRect(135, 5, 50, 50);

/* Paths */

let cx2 = document.querySelectorAll("canvas")[2].getContext("2d");
cx2.beginPath();
for (let y = 0; y < 100; y += 10) {
    cx2.moveTo(10, y);
    cx2.lineTo(90, y);
}
cx2.stroke();

let cx3 = document.querySelectorAll("canvas")[3].getContext("2d");
cx3.beginPath();
cx3.moveTo(50, 10);
cx3.lineTo(10, 70);
cx3.lineTo(90,70);
cx3.fill();

/* Curves */

let cx4 = document.querySelectorAll("canvas")[4].getContext("2d");
cx4.beginPath();
cx4.moveTo(10, 90);
// control = (60, 10) goal = (90, 90)
cx4.quadraticCurveTo(60, 10, 90, 90);
cx4.lineTo(60, 10);
cx4.closePath();
cx4.stroke();

let cx5 = document.querySelectorAll("canvas")[5].getContext("2d");
cx5.beginPath();
cx5.moveTo(10, 90);
// control1 = (10, 10) control2 = (90, 10) goal = (50, 90)
cx5.bezierCurveTo(10, 10, 90, 10, 50, 90);
cx5.lineTo(90, 10);
cx5.lineTo(10, 10);
cx5.closePath();
cx5.stroke();


let cx6 = document.querySelectorAll("canvas")[6].getContext("2d");
cx6.beginPath();
// centre = (50, 50) radius = 40 angle = 0 to 7
cx6.arc(50, 50, 40, 0, 7);
// centre = (150, 50) radius = 40 angle = 0 to 1/2PI
cx6.arc(150, 50, 40, 0, 0.5 * Math.PI);
cx6.stroke();


/* Drawing A Pie Chart */


const results = [
    {name: "Satisfied", count: 1043, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 510, color: "pink"},
    {name: "No comment", count: 175, color: "silver"}
];

let cx7 = document.querySelectorAll("canvas")[7].getContext("2d");
let total = results.reduce((sum, {count}) => sum + count, 0);
// Start at the top
let currentAngle = -0.5 * Math.PI;
for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx7.beginPath();
    // centre = 100, 100, radius = 100
    // from current angle, clockwise by slice's angle
    cx7.arc(100, 100, 100, currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx7.lineTo(100, 100);
    cx7.fillStyle = result.color;
    cx7.fill();
}

/* Text */

let cx8 = document.querySelectorAll("canvas")[8].getContext("2d");
cx8.font = "28px Georgia";
cx8.fillStyle = "fuchsia";
cx8.fillText("I can draw text, too!", 10, 50);


/* Images */
let cx9 = document.querySelectorAll("canvas")[9].getContext("2d");
let img = document.createElement("img");
img.src = "img/hat.png";
img.addEventListener("load", () => {
    for (let x = 10; x < 200; x += 30) {
        cx9.drawImage(img, x, 10);
    }
});

let cx10 = document.querySelectorAll("canvas")[10].getContext("2d");
let img2 = document.createElement("img");
img2.src = "img/player.png";
let spriteW = 37;
let spriteH = 80;
img2.addEventListener("load", () => {
    let cycle = 0;
    setInterval(() => {
        cx10.clearRect(0, 0, spriteW, spriteH);
        cx10.drawImage(img2, cycle * spriteW, 0, spriteW, spriteH, 0, 0, spriteW, spriteH);
        cycle = (cycle + 1) % 8;
    }, 120);
});


/* Transformation */

let cx11 = document.querySelectorAll("canvas")[11].getContext("2d");
cx11.scale(3, .5);
cx11.beginPath();
cx11.arc(50, 50, 40, 0, 7);
cx11.lineWidth = 3;
cx11.stroke();

function flipHorizontally(context, around) {
    context.translate(around, 0);
    context.scale(-1, 1);
    context.translate(-around, 0);
};


let cx12 = document.querySelectorAll("canvas")[12].getContext("2d");
let img3 = document.createElement("img");
img3.src = "img/player2.png"
let spriteW2 = 37;
let spriteH2 = 80;
img3.addEventListener("load", () => {
    flipHorizontally(cx12, 100 + spriteW2 / 2);
    cx12.drawImage(img3, 0, 0, spriteW2, spriteH2, 100, 0, spriteW2, spriteH2);
});



/* Storing And Clearing Transformations */

let cx13 = document.querySelectorAll("canvas")[13].getContext("2d");
function branch(length, angle, scale) {
    cx13.fillRect(0, 0, 1, length);
    if (length < 8) {
        return;
    }
    cx13.save;
    cx13.translate(0, length);
    cx13.rotate(-angle);
    branch(length * scale, angle, scale);
    cx13.rotate(2 * angle);
    branch(length * scale, angle, scale);
    cx13.restore();
}
cx13.translate(300, 0);
branch(60, 0.5, 0.8);


/* Back To The Game */

// This also tracks its own viewport and player direction
class CanvasDisplay {
    constructor(parent, level) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = Math.min(600, level.width * scale);
        this.canvas.height = Math.min(450, level.height * scale);
        parent.appendChild(this.canvas);
        this.cx = this.canvas.getContext("2d");

        this.flipPlayer = false;

        this.viewport = {
            left: 0,
            top: 0,
            width: this.canvas.width / scale,
            height: this.canvas.height / scale
        };
    }

    clear() {
        this.canvas.remove();
    }
}

// 1st compute new viewport then draws the appropriate game scene
CanvasDisplay.prototype.syncState = function(state) {
    this.updateViewport(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
};

// Adjust viewport if player is close to the edge
CanvasDisplay.prototype.updateViewport = function(state) {
    let view = this.viewport;
    let margin = view.width / 3;
    let player = state.player;
    let centre = player.pos.plus(player.size.times(0.5));

    if (centre.x < view.left + margin) {
        view.left = Math.max(centre.x - margin, 0);
    } else if (centre.x > view.left + view.width - margin) {
        view.left = Math.min(centre.x + margin - view.width, state.level.width - view.width);
    }

    if (centre.y < view.top + margin) {
        view.top = Math.max(centre.y - margin, 0);
    } else if (centre.y > view.top + view.height - margin) {
        view.top = Math.min(centre.y + margin - view.height, state.level.height - view.height);
    }
};

// Use different colours based on whether game was won or lost
CanvasDisplay.prototype.clearDisplay = function(status) {
    if (status === "won") {
        this.cx.fillStyle = "rgb(68, 191, 255)";
    } else if (status === "lost") {
        this.cx.fillStyle = "rgb(44, 136, 214)";
    } else {
        this.cx.fillStyle = "rgb(52, 166, 251)";
    }
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

// Drawing the background
let OtherSprites = document.createElement("img");
OtherSprites.src = "img/sprites.png";

CanvasDisplay.prototype.drawBackground = function(level) {
    let {left, top, width, height} = this.viewport;
    let xStart = Math.floor(left);
    let xEnd = Math.ceil(left + width);
    let yStart = Math.floor(top);
    let yEnd = Math.ceil(top + height);

    for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
            let tile = level.rows[y][x];
            if (tile === "empty") {
                continue;
            }
            let screenX = (x - left) * scale;
            let screenY = (y - top) * scale;
            let tileX = tile === "lava" ? scale : 0;
            this.cx.drawImage(OtherSprites, tileX, 0, scale, scale, screenX, screenY, scale, scale);
        }
    }
};

let playerSprites = document.createElement("img");
playerSprites.src = "img/player.png";
const playerXOverlap = 4;

CanvasDisplay.prototype.drawPlayer = function(player, x, y, width, height) {
    width += playerXOverlap * 2;
    x -= playerXOverlap;
    if (player.speed.x != 0) {
        this.flipPlayer = player.speed.x < 0;
    }

    let tile = 8;
    if (player.speed.y != 0) {
        tile = 9;
    } else if (player.speed.x != 0) {
        tile = Math.floor(Date.now() / 60) % 8;
    }
};
