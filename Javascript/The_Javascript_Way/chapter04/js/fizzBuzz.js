/* Write a programme that shows all numbers between 1 and 100 with the following exceptions:
    *it shows "Fizz" instead if the number is divisible by 3
    *it shows "Buzz" instead if the number is divisible by 5
When it is done, improve it to show FizzBuzz instead for the numbers divisible by both 3 and 5.
*/

const fizzBuzzValue = 15;
const buzzValue = 5;
const fizzValue = 3;
const startNum = 1;
const stopNum = 100;

for (let i = startNum; i <= stopNum; i++) {
    let result = "";
    if (i % fizzValue === 0) {
        result += "Fizz";
    }
    if (i % buzzValue === 0) {
        result += "Buzz";
    }
    console.log(result || i);
}
