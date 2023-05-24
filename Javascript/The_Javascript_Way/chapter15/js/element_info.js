/* Write a programme that adds to the page a list showing the height and width of the element identified by “content”.
*/

// Get nodeList of content element
const contentElement = getComputedStyle(document.getElementById("content"));
const infoElement = document.getElementById("infos");
// console.log(contentElement);

// Create list of size
const listElement = document.createElement("ul");
const contentHeightElement = document.createElement("li");
const contentWidthElement = document.createElement("li");

contentHeightElement.textContent = `Height: ${contentElement.height}`;
contentWidthElement.textContent = `Width: ${contentElement.width}`;
console.log(contentHeightElement.textContent);
console.log(contentWidthElement.textContent);

infoElement.appendChild(document.createTextNode("Information about the element"));

infoElement.appendChild(listElement).appendChild(contentHeightElement).appendChild(contentWidthElement);
