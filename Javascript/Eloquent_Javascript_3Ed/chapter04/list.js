/* Build a list of nested objects with the first object holding a reference to the second, and so on.
let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null;
        }
    }
};
Write a function that arrayToList that builds up such a list structure when given [1, 2, 3] as argument.
Write also a function listToArray that produces an array from a list.
Also write a helper function prepend that takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list.
Write a recursive version of nth.
*/

/* HINT
- Building is easier when done from behind.
- Iterate over array backwards and for each element, add an object to the list.
- Use local binding to hold part of the growing list and use an assignment like: list = {value: X, rest: list} to add an element.
- To run over a list (in listToArray and nth), a for loop specification: for (let node = list; node; node = node.rest) {}
At every iteration of the loop, node points to the current sublist, and the body can read its value property to get the current element. At the end of an iteration, node moves to the next sublist until null is reached.
*/

function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = {value: array[i], rest: list};
    }
    return list;
}

function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}

function prepend(value, list) {
    return {value, rest: list};
}

function nth(list, n) {
    if (!list) {
        return undefined;
    } else if (n === 0) {
        return list.value;
    } else {
        return nth(list.rest, n - 1);
    }
}

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
