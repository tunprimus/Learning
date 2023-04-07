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

/* 
function chronometerHandler() {
    const MAXCOUNT = 1000;

    const counterElement = document.getElementById("counter");
    const startElement = document.getElementById("start");
    const pauseElement = document.getElementById("pause");
    const stopElement = document.getElementById("stop");
    const resetElement = document.getElementById("reset");

    let validInterval = null;

    let started = false;

    const buttonsElement = document.querySelectorAll("button");

    buttonsElement.forEach(button => {
        button.addEventListener("click", event => {

        // Counter function
        validInterval = setInterval(() => {
            counterElement.textContent = Number(counterElement.textContent) + 1;
        }, 1000);

        const clicked = (event.target.textContent).toLowerCase();
        console.log(clicked);
        switch (clicked) {
            case "start":
                validInterval();
                break;
            case "pause":
                //
                break;
            case "stop":
                //
                break;
            case "reset":
                //
                break;
            default:
                console.error("Unknown event type");
                break;
        }

        });
    });

}

chronometerHandler();

// Counter function
const increaseCounter = () => {
    const counter = Number(counterElement.textContent);
    while (counter < MAXCOUNT) {
        counterElement.textContent = counter + 1;
        counter++;
    }
};
const validInterval = setInterval(increaseCounter, 1000);
 */


