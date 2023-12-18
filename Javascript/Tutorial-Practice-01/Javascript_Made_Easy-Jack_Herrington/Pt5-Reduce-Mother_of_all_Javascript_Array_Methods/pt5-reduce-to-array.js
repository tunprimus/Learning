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

const groups = [
  [3, 2],
  [2, 5],
  [3, 7],
];

let result2 = groups.reduce((arr, [count, value]) => {
  for (let i = 0; i < count; i++) {
    arr.push(value);
  }
  return arr;
}, []);
console.log(result2);

Array(3);
Array(3).fill(2);

let result3 = groups.reduce((arr, [count, value]) => [
  ...arr,
  ...Array(count).fill(value)
], []);
console.log(result3);