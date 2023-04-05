/* Write the JavaScript code that validates the password when the user submits the form. The validation rules are as follow:
• The two inputted passwords must be identical.
• The minimal password length is 6 characters.
• The password must contain at least one digit.
The validation result must be shown on the page with an appropriate message in each case.
*/

const formElement = document.querySelector("form");
// console.log(formElement.elements);

formElement.addEventListener("submit", event => {
    const password1Element = event.target.elements.password1.value;
    // console.log(password1Element);
    const password2Element = event.target.elements.password2.value;
    // console.log(password2Element.length);
    let passwordLength = "Too short. Must be at least 6 characters!";
    let passwordContainsDigit = "Password must contain at least one digit.";
    //
    const passwordHelpElement = document.getElementById("passwordHelp");
    passwordHelpElement.textContent = "";

    const passwordRegex = /.*\d+.*/;

    if (password1Element !== password2Element) {
        passwordHelpElement.textContent = "Password are not the same.";
    } else if (password1Element.length < 6) {
        passwordHelpElement.textContent = passwordLength;
    } else if (!passwordRegex.test(password1Element)) {
        passwordHelpElement.textContent = passwordContainsDigit;
    } else {
        passwordHelpElement.textContent = `Password good to go!`;
    }
    event.preventDefault();
});

