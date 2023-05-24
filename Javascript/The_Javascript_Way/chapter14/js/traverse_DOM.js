// Show the "Wonders from Antiquity" h2 element
console.log(document.body.childNodes[5].childNodes[1]);
console.log(document.body.childNodes[5].childNodes[2]);

// Get all h2 elements into a NodeList array
const titleElements = document.getElementsByTagName("h2");

console.log(titleElements[0]); // -> Shows the first h2
console.log(titleElements.length); // -> Shows 3
// console.log(titleElements);

// Show all elements that have the class "exists"
const existingElements = Array.from(document.getElementsByClassName("exists"));
existingElements.forEach(element => {
    console.log(element);
});

// Show element with the ID "new"
console.log(document.getElementById("new"));

// Selecting elements via CSS | All "ancient" wonders that still exist
console.log(document.getElementById("ancient").getElementsByClassName("exists").length); // -> 1

// All paragraphs
console.log(document.querySelectorAll("p").length); // -> 3

// All paragraphs inside the "content" ID block
console.log(document.querySelectorAll("#content p").length); // -> 2

// All elements with the "exists" class
console.log(document.querySelectorAll(".exists").length); // -> 8

// All "ancient" wonders that still exist
console.log(document.querySelectorAll("#ancient > .exists").length); // ->1

// Show the first paragraph
console.log(document.querySelector("p"));

// The HTML content of the DOM element with ID "content"
console.log(document.getElementById("content").innerHTML);

// The textual content of the DOM element with ID "content"
console.log(document.getElementById("content").textContent);

// Show href attribute of the first link
console.log(document.querySelector("a").getAttribute("href"));

// Show ID attribute of the first list
console.log(document.querySelector("ul").id);

// Show href attribute of the first link
console.log(document.querySelector("a").href);

// Check if an attribute exist
if (document.querySelector("a").hasAttribute("target")) {
    console.log("The first link has a target attribute.");
} else {
    console.log("The first link does not have a target attribute.");
}

// list of classes of the element identified by "ancient"
const classes = document.getElementById("ancient").classList;
console.log(classes.length); // -> 1
console.log(classes[0]); // -> wonders

// To test the presence of a class on an element by calling the contains() on the class list
if (document.getElementById("ancient").classList.contains("wonders")) {
    console.log("The element with ID 'ancient' has the class 'wonders'.");
} else {
    console.log("The element with ID 'ancient' does not have the class 'wonders'.");
}
