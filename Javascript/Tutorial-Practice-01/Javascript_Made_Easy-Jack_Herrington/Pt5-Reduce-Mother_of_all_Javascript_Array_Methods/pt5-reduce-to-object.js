const numbers = [12, 15, 12, 2, 6, 6, 2, 12,];

const lookup = {};
const lookup2 = {};

for (const number of numbers) {
  lookup[number] = (lookup[number] ?? 0) + 1;
}
console.log(lookup);

const result = numbers.reduce((lookup2, value) => ({
  ...lookup2,
  [value]: (lookup2[value] ?? 0) + 1
}), {});
console.log(result);

// Finding minimum and maximum values
const result2 = numbers.reduce(({ min, max }, value) => ({
  min: Math.min(min, value),
  max: Math.max(max, value)
}), {
  min: Infinity,
  max: -Infinity
});
console.log(result2);