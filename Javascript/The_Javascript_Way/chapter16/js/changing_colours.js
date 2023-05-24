/* Write the associated JavaScript code that updates the background colour of all div tags according to the key (R, Y, G or B) pressed by the user.
*/

let backgroundColour = "";
document.addEventListener("keypress", event => {
    let code = String.fromCharCode(event.charCode);
    console.log(code);
    
    if (code === "red" || code === "R" || code === "r") {
        backgroundColour = "red";
    } else if (code === "yellow" || code === "Y" || code === "y") {
        backgroundColour = "yellow";
    } else if (code === "green" || code === "G" || code === "g") {
        backgroundColour = "green";
    } else if (code === "blue" || code === "B" || code === "b") {
        backgroundColour = "blue";
    } else {
        console.error("Invalid keypress");
    }
    // return backgroundColour;
    /* 
    const divElements = Array.from(document.getElementsByTagName("div"));
 */
    const divElements = Array.from(document.querySelectorAll("div"));

    divElements.forEach(item => {
        item.style.backgroundColor = backgroundColour;
    });
});
