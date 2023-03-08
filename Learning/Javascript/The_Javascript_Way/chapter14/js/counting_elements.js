// Complete the following program to write the countElements() function, that takes a CSS selector as a parameter and returns the number of corresponding elements.

function countElements(attr) {
    if (document.querySelectorAll(attr) !== null) {
        return document.querySelectorAll(attr).length;
    } else {
        console.error("Invalid attribute!")
    }
}

console.log(countElements("p")); // -> Should show 4
console.log(countElements(".adjective")); // -> Should show 3
console.log(countElements("p .adjective")); // -> Should show 3
console.log(countElements("p > .adjective")); // -> Should show 2
