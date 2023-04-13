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


