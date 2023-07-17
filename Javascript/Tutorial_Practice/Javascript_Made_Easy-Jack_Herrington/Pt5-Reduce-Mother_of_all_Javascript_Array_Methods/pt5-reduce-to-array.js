/* Using Array.reduce() to get another array */

const numbers = [1, 2, 3, 4, 5];

let arr = [];

for (const number of numbers) {
  arr = [...arr, number];
}
console.log(arr);

numbers.reduce((arr, number) => [...arr, number], []);

let result = numbers.reduce((arr, number) => [...arr, number], []);
console.log(result);

let resultRight = numbers.reduceRight((arr, number) => [...arr, number], []);
console.log(resultRight);