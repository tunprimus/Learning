/* Write an interactive web page with a button to start and stop a chronometer counting the number of elapsed seconds.
*/

/*
- Get all the elements needed
- Increment the text displayed
- Start increments the text
- Pause allows resume
- Stop stops the counting with no further resume
- Reset changes the counter to 0
*/

const counterElement = document.getElementById("counter");

const startButtonElement = document.getElementById("start");
const stopButtonElement = document.getElementById("stop");
const resetButtonElement = document.getElementById("reset");

let count = 0;
let timerStatus = 0;
let timer = null;

function startTimer() {
    // First call to the timer
    if (timerStatus === 0) {
        timer = setInterval(startTimer, 1000);
        timerStatus = 2;
    }
    count++;
    counterElement.innerHTML = count;

    // When stop and reset are active
    if (timerStatus === 1) {
        timer = setInterval(startTimer, 1000);
        timerStatus = 2;
    }
}

function stopTimer() {
    timerStatus = 1;
    clearInterval(timer);
}

function resetTimer() {
    count = 0;
    timerStatus = 1;
    clearInterval(timer);
    counterElement.innerHTML = count;
}

startButtonElement.addEventListener("click", startTimer);
stopButtonElement.addEventListener("click", stopTimer);
resetButtonElement.addEventListener("click", resetTimer);
