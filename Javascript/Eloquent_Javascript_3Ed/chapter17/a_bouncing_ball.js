/* Use the requestAnimationFrame technique that we saw in Chapter 14 and Chapter 16 to draw a box with a bouncing ball in it. The ball moves at a constant speed and bounces off the box’s sides when it hits them.
*/

let ctx = document.querySelector("canvas").getContext("2d");

let lastTime = null;
function frame(time) {
    if (lastTime != null) {
        updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

let xCoord = 100;
let yCoord = 300;
let radius = 10;
let speedX = 100;
let speedY = 60;

let width = 400;
let height = 400;
let gap = 25;

function updateAnimation(step) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "navy";
    ctx.lineWidth = 4;
    ctx.strokeRect(gap, gap, (width - (2 * gap)), (height - (2 * gap)));

    xCoord += step * speedX;
    yCoord += step * speedY;

    if (xCoord < gap + radius || xCoord > ((width - gap) - radius)) {
        speedX = -speedX;
    }
    if (yCoord < gap + radius || yCoord > ((height - gap) - radius)) {
        speedY = -speedY;
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(xCoord, yCoord, radius, 0, 7);
    ctx.fill();
}
