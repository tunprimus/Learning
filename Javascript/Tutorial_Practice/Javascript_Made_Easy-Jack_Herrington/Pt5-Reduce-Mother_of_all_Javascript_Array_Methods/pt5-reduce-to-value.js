/* Using Array.reduce() to get a single value */

const numbers = [10, 20, 30, 40, 50];

// To get the sum
let sum = 0;

for (const value of numbers) {
  sum += value;
}
console.log(sum);

numbers.reduce((sum, value) => {
  sum += value;
  return sum;
}, 0);
console.log(sum);

numbers.reduce((sum, value) => sum + value, 0);
console.log(sum);

// To get the average
let average;
average = numbers.reduce((avg, value, _, arr) => avg + (value / arr.length), 0);
console.log(average);

// Join an array of names
const names = ['LG', 'Mimi', 'Sadie', 'Ripley'];

const str0 = names.reduce((str, name) => str + name, '');
console.log(str0);
const str1 = names.reduce((str, name) => str + ', ' + name, '');
console.log(str1);
const str2 = names.reduce((str, name, index) => str + (index > 0 ? ', ' : '') + name, '');
console.log(str2);
const str3 = names.join(', ');
console.log(str3);