// Write a programme that asks the user for a raw price and calculates the final price using a VAT rate of 20.6%.

let initialPrice = Number(prompt("Enter list price:"));
const VAT = 0.209;
let finalPrice = initialPrice * (1.0 + VAT);

console.log(`The final price is ${finalPrice}.`);