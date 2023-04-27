/* In this exercise, you’ll show information about some famous paintings on a web page table.
Information about the paintings is located at URL:
https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/paintings.json
It has the following content.
[
    {
        "name": "The Starry Night",
        "year": "1889",
        "artist": "Vincent Van Gogh"
    },
    {
        "name": "The Scream",
        "year": "1893",
        "artist": "Edvard Munch"
    },
    {
        "name": "Guernica",
        "year": "1937",
        "artist": "Pablo Picasso"
    }
]
Write the JavaScript code that fills a table with details about the paintings.
*/

const url = "https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/paintings.json";
const tableElement = document.getElementById("paintings");

fetch(url)
    .then(response => response.json())
    .then(arrayObjects => {
        console.log(arrayObjects);
        arrayObjects.forEach(object => {
            const trElement = document.createElement("tr");
            console.log(object);
            for (const key in object) {
                const tdElement = document.createElement("td");
                tdElement.innerHTML = object[key];
                trElement.appendChild(tdElement);
            }
            tableElement.appendChild(trElement);
        });
    })
    .catch(error => {
        console.error(error.message);
    });

