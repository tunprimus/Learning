/* Build an interface that allows people to type and run pieces of JavaScript code.
Put a button next to a <textarea> field that, when pressed, uses the Function constructor we saw in Chapter 10 to wrap the text in a function and call it. Convert the return value of the function, or any error it raises, to a string and display it below the text field.
*/

const formElement = document.querySelector("form");
const textareaElement = document.querySelector("textarea");
const buttonElement = document.querySelector("button");
// const spanElement = document.querySelector("span");

function workbench () {
    
    formElement.addEventListener("submit", (event) => {
        // console.log(event.target.childNodes[3].value);
        let enteredCode = event.target.childNodes[3].value;
        let returnCode = Function("", `${enteredCode}`);
        // console.log(returnCode);
        return returnCode;
        // spanElement.textContent = returnCode;
    });
    let spanElement = document.createElement("span");
    spanElement.textContent = returnCode;
    formElement.appendChild(spanElement);
}
workbench();
