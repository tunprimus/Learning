// Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method.

function everyLoop(array, predicateFunction) {
    for (let element of array) {
        if (!predicateFunction(element)) {
            return false;
        }
    }
    return true;
}

console.log(everyLoop([1, 3, 5], n => n < 10));
console.log(everyLoop([2, 4, 16], n => n < 10));
console.log(everyLoop([], n => n < 10));

console.log("\n========\n");

function everySome(array, predicateFunction) {
    return !array.some(element => !predicateFunction(element));
}

console.log(everySome([1, 3, 5], n => n < 10));
console.log(everySome([2, 4, 16], n => n < 10));
console.log(everySome([], n => n < 10));
