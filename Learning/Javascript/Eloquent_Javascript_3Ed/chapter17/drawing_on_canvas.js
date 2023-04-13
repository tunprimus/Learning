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

