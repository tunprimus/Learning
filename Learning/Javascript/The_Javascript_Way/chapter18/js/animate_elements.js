//

/* Repeat An Action At Regular Intervals */

// Count down the counter
/* 
const decreaseCounter = () => {
    // Convert counter text to a number
    const counter = Number(counterElement.textContent);
    // Decrease counter by one
    counterElement.textContent = counter - 1;
};

const counterElement = document.getElementById("counter");

// Call the decreaseCounter function every second (1000 millisecond)
setInterval(decreaseCounter, 1000);
 */

// Set up a repeated action
// const intervalid = setInterval(callbackFunction, timeBetweenEachCall);

/* Stop A Repeated Action */
// Count down the counter until 0
const decreaseCounter = () => {
    // Convert counter text to number
    const counter = Number(counterElement.textContent);
    if (counter > 1) {
        counterElement.textContent = counter - 1;
    } else {
        // Cancel the repeated execution
        clearInterval(intervalid);
        // Modify the page title
        const title = document.getElementById("title");
        title.textContent = "BOOM!"
    }
};
const counterElement = document.getElementById("counter");

// Call the decreaseCounter function every second (1000 millisecond)
const intervalid = setInterval(decreaseCounter, 1000);

// Cancel a repeated action set up with setInterval()
clearInterval(intervalid);

