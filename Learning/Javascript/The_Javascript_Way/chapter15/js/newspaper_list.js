/* Write a programme that shows on the page a list of newspapers defined in a Javascript array. Each link must be clickable.
*/

// Newspaper list
const newspapers = ["https://www.nytimes.com", "https://www.washingtonpost.com", "http://www.economist.com"];

// Create object from div and loop over that
const divElement = document.getElementById("content");

// Use forEach to iterate over the array
newspapers.forEach(newspaper => {
    const linkElement = document.createElement("a");
    // Adds links
    linkElement.href = newspaper;
    // Makes links visible
    linkElement.textContent = newspaper;
    // Attach to page; <br> necessary to separate items
    divElement.appendChild(linkElement).appendChild(document.createElement("br"));
});
