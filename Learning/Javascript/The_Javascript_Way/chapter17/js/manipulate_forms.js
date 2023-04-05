//

/* Text Zones */

// Access input values
// Define the value of the "username" input field
const usernameElement = document.getElementById("username");
usernameElement.value = "MyCoolUsername";

// Handling focus
// Show a tip associated with a selected text area
usernameElement.addEventListener("focus", event => {
    document.getElementById("usernameHelp").textContent = "Enter a unique username!";
});

// Hide the advice when the user moves onto a different field
usernameElement.addEventListener("blur", event => {
    document.getElementById("usernameHelp").textContent = "";
});

// Give focus to the "username" input field
usernameElement.focus();

/* Choice Elements */

// Checkboxes
//Show if the email confirmation checkbox is checked
document.getElementById("confirmation").addEventListener("change", event => {
    console.log(`Email confirmation request: ${event.target.checked}`);
});

// Radio buttons
// Show the subscription type via radio button
const subscriptionElements = Array.from(document.getElementsByName("subscription"));
subscriptionElements.forEach(element => {
    element.addEventListener("change", event => {
        console.log(`Selected subscription: ${event.target.value}`);
    });
});

// Dropdown lists
// Show the selected nationality
document.getElementById("nationality").addEventListener("change", event => {
    console.log(`Nationality code: ${event.target.value}`);
});


/* Form as DOM Elements */

// Accessing form fields
// Show some info about the first form element
const formElement = document.querySelector("form");
console.log(`Number of fields: ${formElement.elements.length}`);
console.log(formElement.elements[0].name);
console.log(formElement.elements.password.type);

// Submitting a form
// Shows all user input and cancels form data sending
formElement.addEventListener("submit", event => {
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const email = event.target.elements.emailAddress.value;
    console.log(`Username: ${username}, password: ${password}, email: ${email}`);

    if (event.target.elements.confirmation.checked) {
        console.log("You asked for email confirmation");
    } else {
        console.log("You did not asked for email confirmation");
    }

    switch (event.target.elements.subscription.value) {
        case "newspromo":
            console.log("You are subscribed to newsletters and promotions");
            break;
        case "news":
            console.log("You are subscribed to newsletters only");
            break;
        case "no":
            console.log("You are not subscribed to anything");
            break;
        default:
            console.error("Unknown subscription code");
    }

    switch (event.target.elements.nationality.value) {
        case "US":
            console.log("Hello! You are a US citizen");
            break;
        case "FR":
            console.log("Bonjour! You are a French citizen");
            break;
        case "ES":
            console.log("Hola! You are a Spanish citizen");
            break;
        default:
            console.log("Your nationality is unknown");
    }
    event.preventDefault();
});


// Form Validation

// Instant validation
// Validate password length
document.getElementById("password").addEventListener("input", event => {
    const password = event.target.value;
    let passwordLength = "too short";
    let messageColour = "red";
    if (password.length >= 8) {
        passwordLength = "adequate";
        messageColour = "green";
    } else if (password.length >= 4) {
        passwordLength = "moderate";
        messageColour = "orange";
    }
    const passwordHelpElement = document.getElementById("passwordHelp");
    passwordHelpElement.textContent = `Length: ${passwordLength}`;
    passwordHelpElement.style.color = messageColour;
});

// Post-input validation
// Checking an email address once it is entered
document.getElementById("emailAddress").addEventListener("blur", event => {
    let emailAddressValidity = "";
    if (event.target.indexOf("@") === -1) {
        // the email address does not contain @
        emailAddressValidity = "Invalid address";
    }
    document.getElementById("emailHelp").textContent = emailAddressValidity;
});

/* Regular Expression */

const regex = /@/;
console.log(regex.test(""));
console.log(regex.test("@"));
console.log(regex.test("sophie&mail.fr"));
console.log(regex.test("sophie@mail.fr"));

// Check email validity when field loses focus
document.getElementById("emailAddress").addEventListener("blur", event => {
    // Match a string of the form xxx@yyy.zzz
    const emailRegex = /.+@.+\..+/;
    let validityMessage = "";
    if (!emailRegex.test(event.target.value)) {
        validityMessage = "Invalid address";
    }
    document.getElementById("emailHelp").textContent = validityMessage;
});

