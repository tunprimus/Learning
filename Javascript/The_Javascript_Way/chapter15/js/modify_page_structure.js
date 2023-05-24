// Modifying an HTML element by adding an <li>
document.getElementById("languages").innerHTML += '<li id="c">C</li>';

// Delete the HTML content of the list, replacing it with nothing
// document.getElementById("languages").innerHTML = "";

/* When using innerHTML, you put HTML content into strings. To keep your code readable and avoid mistakes, you should only use innerHTML to make small content changes.
*/

// Modify the title's text content
document.querySelector("h3").textContent += " for programming";

// Define the id attribute of the first title
document.querySelector("h3").setAttribute("id", "title");

// Define the id attribute of the first title directly
document.querySelector("h3").id = "title";

// classList property is used to add or remove classes from a DOM element
const titleElement = document.querySelector("h3");
titleElement.classList.remove("beginning");
titleElement.classList.add("title");
console.log(titleElement);

/* Adding a new element to a web page can be broken into three steps:
- Create the new element;
- Set element properties;
- Insert the new element in the DOM.
*/
// Create an "li" element
const pythonElement = document.createElement("li");
// Define element ID
pythonElement.id = "python";
// Define its text content
pythonElement.textContent = "Python";
// Insert the new element into the DOM
document.getElementById("languages").appendChild(pythonElement);

// Using createTextNode() to create the new element's textual content | insert Ruby at the end of the list
const rubyElement = document.createElement("li");
rubyElement.id = "ruby";
rubyElement.appendChild(document.createTextNode("Ruby"));
document.getElementById("languages").appendChild(rubyElement);

// Adding a node before another one | insert Perl before PHP
const perlElement = document.createElement("li");
perlElement.id = "perl";
perlElement.textContent = "Perl";
document.getElementById("languages").insertBefore(perlElement, document.getElementById("php"));

/* Determining the exact position of the new node
To more precisely define the position of inserted elements, use the insertAdjacentHTML() method by calling it on an existing element and passing to it the position and a string of HTML characters that represent the new content to be added. The new content’s position should be either:
- beforebegin: before the existing element;
- afterbegin: inside the existing element, before its first child;
- beforeend: inside the existing element, after its last child;
- afterend: after the existing element.
Here’s how these positions translate relative to an existing <p> tag.

<!-- beforebegin -->
<p>
<!-- afterbegin -->
foo
<!-- beforeend -->
</p>
<!-- afterend -->
*/

// Add an element to the beginning of a list | add Javascript at the top of the language list
document.getElementById("languages").insertAdjacentHTML("afterbegin", '<li id = "javascript">Javascript</li>');

// Replacing a node | replacing Perl language with Lisp
const lispElement = document.createElement("li");
lispElement.id = "lisp";
lispElement.textContent = "Lisp";
document.getElementById("languages").replaceChild(lispElement, document.getElementById("perl"));

// Removing a node | remove the list element with the "lisp" id
document.getElementById("languages").removeChild(document.getElementById("lisp"));

/*
DOM elements are equipped with a property called style, which returns an object representing the HTML element’s style attribute. This object’s properties match up to its CSS properties. By defining these properties with JavaScript, you’re actually modifying the element’s style.
*/
// Select the page's 1st paragraph and modifies its text colour and margins
const paragraphElement = document.querySelector("p");
paragraphElement.style.color = "red";
paragraphElement.style.margin = "50px";

// Ditch the hyphen in compound names of CSS properties and use camelCase
paragraphElement.style.fontFamily = "Arial";
paragraphElement.style.backgroundColor = "black";

/* The limits of the style property
Because the style property used in this code only represents the style attribute of the element, one cannot access style declarations defined elsewhere, for example in a CSS stylesheet.
*/
// Try to display the text colour of each of the paragraphs
const paragraphElements = document.getElementsByTagName("p");
console.log(paragraphElements[0].style.color); // -> "red"
console.log(paragraphElements[1].style.color); // -> "green"
console.log(paragraphElements[2].style.color); // -> Show an empty string

/* A better solution for accessing element styles is to use a function called getComputedStyle(). This function takes a DOM node as a parameter and returns an object that represents the element’s style. One can then see the different CSS properties of the object.
*/
// Styling the 3rd paragraph
const paragraphStyle = getComputedStyle(document.getElementById("para"));
console.log(paragraphStyle.fontStyle); // -> "italic"
console.log(paragraphStyle.color); // -> "colour blue in RGB values"

/* DOM manipulations and performance
Altering the DOM with Javascript causes the browser to compute the page; frequent manipulations thus lead to slowdown and other performance problems.
Mitigate by creating and setting all element properties before batch inserting into the DOM.
*/

// Bad: DOM is updated multiple times
const newNode = document.createElement("..."); // -> Create new element
parentNode.appendChild(newNode); // -> Add it to the DOM
newNode.id = "..."; // -> Set some elements properties
newNode.textContent = "..."; // -> Add some text content

// Better: DOM is updated only once
const newNode = document.createElement("..."); // -> Create new element
newNode.id = "..."; // -> Set some elements properties
newNode.textContent = "..."; // -> Add some text content
parentNode.appendChild(newNode); // -> Add it to the DOM
