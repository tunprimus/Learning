/* EVENT-DRIVEN PROGRAMMING
*/

// Message function
const showMessage = () => {
    alert("Hello!");
};

// Access the button
const buttonElement = document.getElementById("myButton");
// Listen to the "click" event
buttonElement.addEventListener("click", showMessage);

// Adding an event listener | Show a message when the user clicks on the button
document.getElementById("myButton").addEventListener("click", () => {
    alert("Hello!");
});
/* 
document.getElementById("myButton").addEventListener("click", () => alert("Hello!"));
 */

// Removing an event listener | Remove the handler for the click event (Only works for non-anonymous functions)
buttonElement.removeEventListener("click", showMessage);

// Show event type and target when the user clicks on the button
document.getElementById("myButton").addEventListener("click", e => {
    console.log(`Event type: ${e.type} target: ${e.target}`);
});


/* Reacting to Common Events */


// Show the pressed character using the String.FromCharCode() method and (now deprecated charCode property)
document.addEventListener("keypress", e => {
    console.log(`You pressed the ${String.fromCharCode(e.charCode)} key.`);
});

// To show information on a keyboard event (both keydown and keyup)
const keyboardInfo = e => {
    console.log(`Keyboard event: ${e.type}, key: ${e.keyCode}`);
};
// Integrate this function into key press and release (keydown->keypress->keyup)
document.addEventListener("keydown", keyboardInfo);
document.addEventListener("keyup", keyboardInfo);

// Code to show information on all click events on a webpage through mouseInfo() and getMouseButton() functions
// Return the name of the mouse button
const getMouseButton = code => {
    let button = "unknown";
    switch (code) {
        case 0:
            button = "left";
            break;
        case 1:
            button = "middle";
            break;
        case 2:
            button = "right";
            break;
    }
    return button;
};
// Show info about mouse event
const mouseInfo = e => {
    console.log(`Mouse event: ${e.type}, button: ${getMouseButton(e.button)}, X: ${e.clientX}, Y: ${e.clientY}`);
};
// Add mouse click event listener
document.addEventListener("click", mouseInfo);
// Handle mouse button press and release (mousedown->mouseup->click)
document.addEventListener("mousedown", mouseInfo);
document.addEventListener("mouseup", mouseInfo);


// Page loading | Webpage loading event
window.addEventListener("load", e => {
    console.log("The page has been loaded!");
});

// Page closing | Handle webpage closing
window.addEventListener("beforeunload", e => {
    const message = "Should you stay or should you go?";
    // Standard way of showing a confirmation dialogue
    e.returnValue = message;
    // Browser specific way of showing a confirmation dialogue
    return message;
});


/* Event Propagation */

// Click handler on the document
document.addEventListener("click", e => {
    console.log("Document handler");
});
// Click handler on the paragraph
document.getElementById("para").addEventListener("click", e => {
    console.log("Paragraph handler");
});
// Click handler on the button
document.getElementById("propa").addEventListener("click", e => {
    console.log("Button handler");
    // To stop event propagation up the DOM
    e.stopPropagation();
});

// Cancelling the default behaviour of an action | Handling clicking on the forbidden link
document.getElementById("forbidden").addEventListener("click", e => {
    alert("Yes... But no.");
    // Cancels the default behaviour
    e.preventDefault();
});
