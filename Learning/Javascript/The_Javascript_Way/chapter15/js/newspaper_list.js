/* Write a programme that shows on the page a list of newspapers defined in a Javascript array. Each link must be clickable.
*/

// Newspaper list
const newspapers = ["https://www.nytimes.com", "https://www.washingtonpost.com", "http://www.economist.com"];

/* 
const linkNodes = newspapers.forEach(newspaper => {
    const linkElement = document.createElement("a");
    // console.log(newspaper);
    console.log(linkElement.innerHTML = newspaper);
    return linkElement.innerHTML = newspaper;
});
 */

function linkNodes() {
    newspapers.forEach(newspaper => {
    const linkElement = document.createElement("a");
    // console.log(newspaper);
    // console.log(linkElement.innerHTML = newspaper);
    return linkElement.innerHTML = newspaper;
    });
}

linkNodes();

document.getElementById("content").appendChild(linkNodes());
