//


/* Event Handlers */
/* 
window.addEventListener("click", () => {
    console.log("You knocked?");
});
 */


/* Events And DOM Nodes */
/* 
let button1 = document.querySelector("button");
button1.addEventListener("click", () => {
    console.log("Button clicked.");
});
 */
// A node can only have 1 onclick attribute but one can use addEventListener to add multiple handlers

// Using removeEventListener - same named function must be given to both addEventListener and removeEventListener
/* 
let button2 = document.querySelectorAll("button")[1];
function once() {
    console.log("Done");
    button2.removeEventListener("click", once);
}
button2.addEventListener("click", once);
 */

/* Event Objects */
// Event objects are what are passed as arguments to event handlers.
// let button3 = document.querySelector("button");
/* 
let button3 = document.querySelectorAll("button")[2];
button3.addEventListener("mousedown", event => {
    if (event.button === 0) {
        console.log("Left button");
    } else if (event.button === 1) {
        console.log("Middle button");
    } else if (event.button === 2) {
        console.log("Right button");
    }
});
*/

/* Propagation */

// Stopping event propagation
// let para = document.querySelector("p");
let para = document.querySelectorAll("p")[2];
let button4 = document.querySelectorAll("button")[3];
para.addEventListener("mousedown", () => {
    console.log("Handler for paragraph.");
});
button4.addEventListener("mousedown", event => {
    console.log("Handler for button.");
    if (event.button === 2) {
        event.stopPropagation();
    }
});

// Using the target property of event object
document.body.addEventListener( "click", event => {
    if (event.target.nodeName === "BUTTON") {
        console.log("Clicked", event.target.textContent);
    }
});


/* Default Actions */

// Prevent default actions
let link = document.querySelector("a");
link.addEventListener("click", event => {
    console.log("Nope.");
    event.preventDefault();
});


/* Key Events */

// Using the "keydown" and "keyup" events
window.addEventListener("keydown", event => {
    if (event.key === "v") {
        document.body.style.background = "violet";
    }
});
window.addEventListener("keyup", event => {
    if (event.key === "v") {
        document.body.style.background = "";
    }
});

// Monitoring for modifier keys
window.addEventListener("keydown", event => {
    if (event.key === " " && event.ctrlKey) {
        console.log("Continuing!");
    }
});
