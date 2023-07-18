const numbers = [1, 2, 3, 4, 5];

// Includes
const result = numbers.reduce((includes, value) => (includes ? includes : value === 3), false);
console.log(result);

const result1 = numbers.reduce((includes, value) => (includes ? includes : value === 10), false);
console.log(result1);

// Slice
const result2 = numbers.reduce((arr, value, index) => (
  index > 0 && index < 4 ? [...arr, value] : arr
), []);
console.log(result2);

// Map
const result3 = numbers.reduce((arr, value) => [
  ...arr,
  value * 100
], []);
console.log(result3);