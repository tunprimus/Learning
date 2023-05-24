/*Write functions that takes argument start, end and step.
First, write a range function that takes start and end and returns an array containing all the numbers from start up to (and including) end.
Second, write a sum function that takes an array of numbers and returns the sum of the numbers.
Finally, modify your range function to use step value to build the array if this is given or otherwise use increments of 1.
*/

/* let start = 1;
let end = 10;
let step = 1; */

let start = 1;
let end = 10;
let step = 2;

/* let start = 5;
let end = 2;
let step = -1;
 */
function arrayFromRange(start, end, step) {
    let rangeArray = [];
    if (step < 0) {
        absStep = step * -1;
        for (let i = start; i >= end; i -= absStep) {
            rangeArray.push(i);
        }
        return rangeArray;
    } else {
        for (let j = start; j <= end; j += step) {
            rangeArray.push(j);
        }
        return rangeArray;
    }
}

console.log(arrayFromRange(start, end, step));

function sumArrayFromRange(numArray) {
    numArray = arrayFromRange(start, end, step);
    let sum = 0;
    for (let element of numArray) {
        sum += element;
    }
    return sum;
}

console.log(sumArrayFromRange());
