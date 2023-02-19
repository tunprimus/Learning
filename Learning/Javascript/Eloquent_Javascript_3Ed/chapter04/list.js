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
*/