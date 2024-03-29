const values = [10, 20, 30, 40, 50];

values.entries();
for (const value of values.entries()) {
  console.log(value);
}

for (const value of values.keys()) {
  console.log(value);
}

for (const value of values.values()) {
  console.log(value);
}

const customers = {
  Jack: 12,
  Jim: 15,
  Sally: 18,
};

function sum(objOrArray) {
  return Object.values(objOrArray).reduce((sum, value) => sum + value, 0);
}

sum(values);
console.log(sum(values));

sum(customers);
console.log(sum(customers));