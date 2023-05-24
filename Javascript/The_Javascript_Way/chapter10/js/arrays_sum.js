// Complete the following programme to compute and show the total sum of the values in each of the arrays.

const arrays = [[1, 4], [11], [3, 5, 7]];

function flattenArray(array) {
    return array.reduce((accumulator, current) => accumulator.concat(Array.isArray(current) ? flattenArray(current) : current), []);
};

/* const flattenedArray = flattenArray(arrays);

const arraysSum = flattenedArray.reduce((acc, value) => acc + value, 0); */

const arraysSum = flattenArray(arrays).reduce((acc, value) => acc + value, 0);

console.log(arraysSum); // Should show 31
