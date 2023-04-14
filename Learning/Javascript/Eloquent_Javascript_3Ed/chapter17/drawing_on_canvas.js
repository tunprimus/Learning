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
