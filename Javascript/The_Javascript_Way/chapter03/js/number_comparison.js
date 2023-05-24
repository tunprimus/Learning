// Write a programme that accepts two numbers, then compares their values and displays an appropriate message in all cases.

const num1 = Number(prompt("Enter 1st number:"));
const num2 = Number(prompt("Enter 2nd number:"));

if (num1 < num2) {
    console.log("Second number is larger.");
} else if (num1 > num2) {
    console.log("First number is larger.");
} else {
    console.log("Both numbers are equal.");
}
