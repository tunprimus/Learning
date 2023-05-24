/* Write a programme that asks the user for the new text colour, and then asks for the new background colour. The page is then updated accordingly.
*/

let textColour = null;
let backgroundColour = null;

do {
    textColour = prompt("What colour should the text be?");
    bgColour = prompt("What colour should the background be?");
}
while (textColour !== null && backgroundColour !== null);

/* 
const textColour = prompt("What colour should the text be?");
const bgColour = prompt("What colour should the background be?");
 */

const divElements = document.querySelectorAll("div");

divElements.forEach(item => {
    item.style.color = textColour;
    item.style.backgroundColor = bgColour;
    return item;
});

/* 
divElements.style.backgroundColor = bgColour;
divElements.style.textColour = textColour;
 */
