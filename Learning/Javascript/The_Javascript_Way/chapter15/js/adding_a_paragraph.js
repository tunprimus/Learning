/* Adding a paragraph
Improve the languages example to add a paragraph (<p> tag) containing a link (<a> tag) to the URL https://en.wikipedia.org/wiki/List_of_programming_languages.
Here is a more complete list of languages.
*/

// Modifying an HTML element by adding an <li>
document.getElementById("languages").innerHTML += '<li id="c">C</li>';

// Modify the title's text content
document.querySelector("h3").textContent += " for programming";

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

// Add an element to the beginning of a list | add Javascript at the top of the language list
document.getElementById("languages").insertAdjacentHTML("afterbegin", '<li id = "javascript">Javascript</li>');

// Create DOM element and use innerHTML to add content
const paragraphElement = document.createElement("p");

// preElement.id = "info";
const paragraphText = 'Here is a more complete <a href="https://en.wikipedia.org/wiki/List_of_programming_languages">list</a> of languages';
/* let paragraphNode = `${paragraphText}`;
console.log(paragraphNode); */

const linkElement = document.createElement("a");
console.log(linkElement);
linkElement.href = "https://en.wikipedia.org/wiki/List_of_programming_languages";
linkElement.textContent = "list";

paragraphElement.appendChild(document.createTextNode("Here is a more complete "));

paragraphElement.appendChild(linkElement);
console.log(paragraphElement);


paragraphElement.appendChild(document.createTextNode(" of languages."));

console.log(paragraphElement);

document.getElementById("content").appendChild(paragraphElement);

