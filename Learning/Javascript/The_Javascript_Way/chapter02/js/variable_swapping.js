// Observe the following programme. Add the necessary code to swap the values of variables number1 and number2.

let number1 = 5;
let number2 = 3;

// Swap without explicit temp variable
number1 = number1 + number2;
number2 = number1 - number2;
number1 = number1 - number2;

console.log(number1);
console.log(number2);