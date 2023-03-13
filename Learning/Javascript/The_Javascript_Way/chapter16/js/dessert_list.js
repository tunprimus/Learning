/* Write the JavaScript code that adds a new dessert to the list when the user clicks on the button. The dessert name is chosen by the user.
Bonus points for adding the possibility of changing a dessert’s name when clicking on it.
*/

/*
- add event listener to button
- display prompt for user to enter dessert name and store it
- create list item and use stored name as text content
- add event listener to to generated list
*/

// Refactor to use closure property
// const addBtnElement = document.getElementById("addButton");

document.getElementById("addButton").addEventListener("click", () => {
    const listsElement = document.getElementById("desserts");
    const dessertElement = document.createElement("li");

    const dessertName = prompt("What is your dessert name?");
    
    /* let none = addBtnElement.addEventListener("click", () => {
        prompt("What is your dessert name?");
    }); */
    dessertElement.textContent = dessertName;
    listsElement.appendChild(dessertElement);
});
