/* Write a programme that uses console.log to print all numbers from 1 to 100 with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.
When you have that working, modify your programme to print "FizzBuzz" for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
*/

const fizzBuzzValue = 15;
const buzzValue = 5;
const fizzValue = 3;
const startNum = 1;
const stopNum = 100;

for (let i = startNum; i <= stopNum; i++) {
    if (i % fizzBuzzValue === 0) {
        console.log("FizzBuzz");
    } else if (i % buzzValue === 0) {
        console.log("Buzz");
    } else if (i % fizzValue === 0) {
        console.log("Fizz");
    } else {
        console.log(i);
    }
}

/* Book solution
for (let n = 1; n <= 100; n++) {
    let output = "";
    if (n % 3 == 0) output += "Fizz";
    if (n % 5 == 0) output += "Buzz";
    console.log(output || n);
}
*/
