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
const startElement = document.getElementById("start");
const pauseElement = document.getElementById("pause");
const stopElement = document.getElementById("stop");
const resetElement = document.getElementById("reset");

// Counter function
const increaseCounter = () => {
    const counter = Number(counterElement.textContent);
    while (counter < 200) {
        counterElement.textContent = counter + 1;
        counter++;
    }
};

const validInterval = setInterval(increaseCounter, 1000);
