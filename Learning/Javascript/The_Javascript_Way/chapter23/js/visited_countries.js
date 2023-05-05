/* The goal of this exercise is to send your travelling info to a server. Data is expected as a JSON object containing two fields:
• A name field representing your name. Its value is a string.
• A countries field representing the countries you already visited. Its value is an array of objects. Each object has a name field (string) for the country name, and a year field (integer) for the year you last visited it.
This data must be sent to the URL https://thejsway-server.herokuapp.com/api/countries.
You should receive a confirmation message from the server and display it in the console.
*/

const travelledTo = {
    name: "Tunprimus",
    countries: [
        {
            name: "Ghana",
            year: 2011,
        },
        {
            name: "Ethiopia",
            year: 2013,
        },
        {
            name: "Togo",
            year: 2016,
        }
    ],
};

const url = "https://thejsway-server.herokuapp.com/api/countries";

fetch(url, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(travelledTo),
})
    .then(response => response.text())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error.message);
    });

