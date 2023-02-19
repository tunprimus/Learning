/*Write two functions that reverse an array by producing a new reversed array with the first function and in place modification of the array by the second function.
*/

let myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function reverseArray(array) {
    let tempArray = [];
    for (let element of array) {
        tempArray.unshift(element);
    }
    return tempArray;
}

console.log(reverseArray(myArray));

function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        [array[i], array[array.length - 1 - i]] = [array[array.length - 1 - i], array[i]];
    }
    return array;
}

console.log(reverseArrayInPlace(myArray));
