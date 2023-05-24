// Complete the following programme so that it asks the user for first and last names, then show the result of the sayHello() function.

function sayHello(firstName, lastName) {
    const message = `Hello, ${firstName} ${lastName}!`;
    return message;
}

const yourFirstName = prompt("Please enter your first name:");
const yourLastName = prompt("Please enter your first name:");

sayHello(yourFirstName, yourLastName);
