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
/* 
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

 */


/* Trigger An Action After A Delay */

/* 
// Count down the counter until 0
const decreaseCounter = () => {
    // Convert counter text to a number
    const counter = Number(counterElement.textContent);
    if (counter > 1) {
        counterElement.textContent = counter - 1;
    } else {
        // Cancel the repeated action
        clearInterval(intervalid);
        // Modify the page title
        const titleElement = document.getElementById("title");
        titleElement.textContent = "BOOM!";
        // Modify the title after 2 seconds
        setTimeout(() => {
            titleElement.textContent = "Everything is broken now :(";
        }, 2000);
    }
};
const counterElement = document.getElementById("counter");

// Call the decreaseCounter function every second (1000 millisecond)
const intervalid = setInterval(decreaseCounter, 1000);

// Execute an action once after a delay
setTimeout(callbackFunction, timeBeforeCall);
 */

/* Animate Page Elements */

/* 
// Move the block to the left
const moveBlock = () => {
    // Convert the left position of the block (value of the form XXpx) to a number
    const xBlock = parseFloat(getComputedStyle(blockElement).left);
    // Move the block to the right
    blockElement.style.left = (xBlock + movement) + "px";
    // Have the browser call moveBlock as soon as possible
    requestAnimationFrame(moveBlock);
};
const blockElement = document.getElementById("block");
// Movement value in pixels
const movement = 7;
// Start the animation
requestAnimationFrame(moveBlock);
 */

/* Start An Animation */

/* 
// How to combine requestAnimationFrame with an animation function
const animate = () => {
    // Animation code
    // ...
    // At end of animation, request another one
    animationId = requestAnimationFrame(animate);
};
// Animation start
let animationId = requestAnimationFrame(animate);
 */


/* Stop An Animation */

// Update the above code so as tp stop the animation
// Move the block to the right, all the way to the end of the frame
const moveBlock = () => {
    // Convert the left position of the block (value of the form "XXpx") to a number
    const xBlock = parseFloat(getComputedStyle(blockElement).left);
    // Convert the width of the frame (value of the form "XXpx") to a number
    const xMax = parseFloat(getComputedStyle(frame).width);
    // If the block is not already to the end of the frame
    if (xBlock + blockWidth <= xMax) {
        // Block movement
        blockElement.style.left = (xBlock + movement) + "px";
        animationId = requestAnimationFrame(moveBlock);
    } else {
        // Cancel the animation
        cancelAnimationFrame(animationId);
    }
};

const blockElement = document.getElementById("block");
// Convert the block width (value of the form "XXpx") to a number
const blockWidth = parseFloat(getComputedStyle(block).width);
// Movement value in pixels
const movement = 7;
// Start the animation
let animationId = requestAnimationFrame(moveBlock);
