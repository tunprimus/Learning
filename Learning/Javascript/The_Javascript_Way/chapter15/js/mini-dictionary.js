/* Write a programme that shows on the page a list of terms and definitions defined in a JavaScript array.
Use the HTML <dl> tag to create the list. Each term of the dictionary should be given more importance with a <strong> tag.
*/

const words = [{
        term: "Procrastination",
        definition: "Avoidance of doing a task that needs to be accomplished"}, 
    {
        term: "Tautology",
        definition: "logical argument constructed in such a way that it is logically irrefutable"},
    {
        term: "Oxymoron",
        definition: "figure of speech that juxtaposes elements that appear to be contradictory"
}];


/* 
// Create arrays of keys from the words object
const termKeys = Object.keys(words);
console.log(termKeys);
 */

// Select div as parent
const divElement = document.getElementById("content");

const dlElement = document.createElement("dl");

words.forEach( word => {
    const dtElement = document.createElement("dt");
    const strongElement = document.createElement("strong");
    strongElement.innerHTML = word.term;
    const ddElement = document.createElement("dd");
    ddElement.innerHTML = word.definition;

    dtElement.appendChild(strongElement);
    dlElement.appendChild(dtElement);
    dlElement.appendChild(ddElement);
});

// Add to the parent on the document
divElement.appendChild(dlElement);
