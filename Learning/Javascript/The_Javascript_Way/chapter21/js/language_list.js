/* The objective of this exercise is to display the languages of the previous file languages.txt on a web page. Here is the starter HTML code.
Write the JavaScript code that fetches the file from the web server and fills the HTML list.
*/

const url = "https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/languages.txt";
const unorderedListElement = document.getElementById("languageList");

fetch(url)
    .then(response => response.text())
    .then(textString => {
        textArray = textString.split(";");
        textArray.forEach(text => {
            let li = document.createElement("li");
            li.textContent = text;
            unorderedListElement.appendChild(li);
        });
    })
    .catch(error => {
        console.error(error.message);
    });
