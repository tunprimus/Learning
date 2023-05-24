/* Build an interface that allows people to type and run pieces of JavaScript code.
Put a button next to a <textarea> field that, when pressed, uses the Function constructor we saw in Chapter 10 to wrap the text in a function and call it. Convert the return value of the function, or any error it raises, to a string and display it below the text field.
*/

const formElement = document.querySelector("form");
const textareaElement = document.querySelector("textarea");
const buttonElement = document.querySelector("button");
const spanElement = document.querySelector("span");

function workbench () {
    // const spanElement = document.createElement("span");
    formElement.addEventListener("submit", (event) => {
        // console.log(event.target.childNodes[3].value);
        let enteredCode = event.target.childNodes[3].value;
        let returnCode = null;
        try {
            returnCode = (Function(enteredCode))();
            spanElement.innerText = String(returnCode);
        } catch (error) {
            spanElement.innerText = "Error: " + error;
        }
        // formElement.appendChild(spanElement);
        event.preventDefault();
    });
}
workbench();
