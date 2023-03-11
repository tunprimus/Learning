/* Write the JavaScript code that counts the number of clicks on the myButton button by updating the clickCount element. The deactivate button stops the counting.
*/

// Click counting function
const clickCounter = () => {
    const clickCountElement = document.getElementById("clickCount");
    const clickCount = Number(clickCountElement.textContent);
    clickCountElement.textContent = clickCount + 1;
};

// Attach function to button
document.getElementById("myButton").addEventListener("click", clickCounter);

// Deactivate counter from another button
document.getElementById("deactivate").addEventListener("click", () => {
    document.getElementById("myButton").removeEventListener("click", clickCounter);
});
