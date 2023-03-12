/* Write the associated JavaScript code that updates the background colour of all div tags according to the key (R, Y, G or B) pressed by the user.
*/

let keyCode = "";

document.addEventListener("keypress", event => {
    keyCode = `${String.fromCharCode(event.charCode)}`;
    return keyCode;
});

const divElements = document.querySelectorAll("div");

divElements.forEach(item => {
    if (keyCode === "red" || keyCode === "R" || keyCode === "r") {
        item.backgroundColor = red;
    } else if (keyCode === "green" || keyCode === "G" || keyCode === "g") {
        item.backgroundColor = green;
    } else if (keyCode === "blue" || keyCode === "B" || keyCode === "b") {
        item.backgroundColor = blue;
    } else {
        console.error("Invalid keypress");
    }
});

