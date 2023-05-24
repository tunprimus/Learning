// Complete the following programme so that it offers the four basic arithmetical operations: addition, subtraction, multiplication and division.

function calculate(num1, operator, num2) {
    switch(operator) {
        case "+":
            return num1 + num2;
            break;
        case "-":
            return num1 - num2;
            break;
        case "*":
            return num1 * num2;
            break;
        case "/":
            return num1 / num2;
        default:
            console.log("Invalid operator");
            break;
    }
}

console.log(calculate(4, "+", 6));
console.log(calculate(4, "-", 6));
console.log(calculate(2, "*", 0));
console.log(calculate(12, "/", 0));
