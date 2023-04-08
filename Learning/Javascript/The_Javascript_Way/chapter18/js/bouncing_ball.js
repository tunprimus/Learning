/* The goal of this exercise is to make a basketball bounce across the screen.
Write the JavaScript code that makes the ball bounce horizontally.
With your solution, create a variable with values 1 or -1 that dictates the direction in which the
ball should move.
*/

const frameElement = document.getElementById("frame");
const ballElement = document.getElementById("ball");
const startButtonElement = document.getElementById("start");
const stopButtonElement = document.getElementById("stop");
const MOVEMENT = 7;
const ballWidth = parseFloat(getComputedStyle(ball).width);

let animationId = null;
const frameMin = 0;
let direction = 1;

const moveBall = () => {
    const xBall = parseFloat(getComputedStyle(ballElement).left);

    const frameMax = parseFloat(getComputedStyle(frameElement).width);
    // console.log(frameMax);
    // Change direction when ball tries to move out of frame
    if ((xBall + ballWidth > frameMax) || (xBall < frameMin)) {
        direction *= -1;
    }

    ballElement.style.left = ((xBall + MOVEMENT) * direction) + "px";
    animationId = requestAnimationFrame(moveBall);
};

startButtonElement.addEventListener("click", () => {
    startButtonElement.disabled = true;
    startButtonElement.disabled = false;
    animationId = requestAnimationFrame(moveBall);
});

stopButtonElement.addEventListener("click", () => {
    startButtonElement.disabled = false;
    stopButtonElement.disabled = true;
    cancelAnimationFrame(animationId);
});
