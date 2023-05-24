// Write a programme that creates the following array, then calculates and shows the array's maximum value

const values = [3, 11, 7, 2, 9, 10];

function arrayMax(array) {
    return Math.max(...array);
}

console.log(arrayMax(values));
