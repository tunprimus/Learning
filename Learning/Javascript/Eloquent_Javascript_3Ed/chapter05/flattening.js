// Use the reduce method in combination with concat method to flatten an array of arrays into a single array that has all the elements of the original array.

const myArrayOfArrays = [[1, 2, 3, 4], ["a", "b", "c", "d"], [5, 6, 7, 8], ["e", "f", "g", "h"], [9, 10, 11, 12], ["i", "j", "k", "l"], [13, 14, 15, 16]];

const myArrayOfArrays2 = [[1, 2, ["a", "b"], 3, 4], ["c", [5, 6, 7, 8], "d"], [9, ["e", "f"], 10 ], ["g", [11, 12], "h"], [13, 14, ["i", "j", "k", "l"], 15, 16]];

function shallowFlattenArray(array) {
    let flatArray = [];
    return flatArray.concat(...array);
}

/*
Summarise into a single value with reduce
function reduce(array, combineFunction, start) {
    let current = start;
    for (let element of array) {
        current = combineFunction(current, element);
    }
    return current;
}
*/

function shallowFlattenArray2(array) {
    return array.reduce((accumulator, element) => {
        // if "element" is an "array", use the "spread syntax" to append elements of the array into the "accumulator" array
        if (Array.isArray(element)) {
            return [...accumulator, ...element];
        } else {
            // otherwise, return elements in the accumulator plus the new element
            return [...accumulator, element];
        }
    }, []);
}

// Using recursion and reduce
// https://dev.to/emmaadesile/how-to-flaten-a-nested-array-4pa2
function deepFlatten(array) {
    const newArray = array.reduce((accumulator, element) => {
        if (Array.isArray(element)) {
            accumulator = accumulator.concat(deepFlatten(element));
        } else {
            accumulator.push(element);
        }
        return accumulator;
    }, []);
    return newArray;
}

// Using Array.prototype.concat() function
// https://www.techiedelight.com/recursively-flatten-nested-array-javascript/
function flattenArray(array) {
    return array.reduce((accumulator, current) => accumulator.concat(Array.isArray(current) ? flattenArray(current) : current), []);
};

/* console.log(shallowFlattenArray(myArrayOfArrays));
console.log("\n========\n");
console.log(deepFlatten(myArrayOfArrays2));
console.log("\n========\n"); */
console.log(flattenArray(myArrayOfArrays2));

