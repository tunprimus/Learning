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
