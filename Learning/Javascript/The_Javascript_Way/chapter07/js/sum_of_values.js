// Write a programme that creates the following array, then calculates and shows the sum of its values.

const values = [3, 11, 7, 2, 9, 10];

// let sum = 0;

function sumOfValues(array) {
    let sum = 0;
    array.forEach(item => {
        sum += item;
    });
    return sum;
}

console.log(sumOfValues(values));
