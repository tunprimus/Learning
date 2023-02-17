// Pretend that Javascript's Math.min() function doesn't exist. Complete the following programme so that the min() function returns the minimum of its two received numbers.

function min(num1, num2) {
    return num1 < num2 ? num1 : num2;
}

console.log(min(4.5, 5));
console.log(min(19, 9));
console.log(min(1, 1));
