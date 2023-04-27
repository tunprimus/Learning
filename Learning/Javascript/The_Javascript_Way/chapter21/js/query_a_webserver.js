

/* Creating Asynchronous HTTP Requests in Javascript */

// The fetch() method
// Sends an anonymous HTTP request to the target url.
/* 
fetch(url)
    .then(() => {
        // Code called in the future when the request ends successfully
    })
    .catch(() => {
        // Code called in the future when an error occurs during the request
    });
 */

// An object with then() and catch() methods is a Javascript promise
/* 
getData()
    .then(a => filterData(a)) // Called asynchronously when getData() returns
    .then(b => processData(b)) // Called asynchronously when filterData() returns
    .then(c => displayData(c)) // Called asynchronously when processData() returns
 */

// Retrieving a text file
fetch("https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/languages.txt")
    .then(response => response.text()) // Access and return response's text content
    .then(text => {
        console.log(text); // Display file content in the console
    });


// Dealing with errors
fetch("http://non-existent-resource")
    .catch(error => {
        console.error(error.message); // Display error message
    });

// Handling JSON data
// JSON.parse() to transform JSON string to Javascript object and JSON.stringify() to transform Javascript object into a JSON string

const plane = {
    manufacturer: "Airbus",
    model: "A320",
};
console.log(plane);

const planeText = JSON.stringify(plane);
console.log(planeText);

console.log(JSON.parse(planeText));

const planes = [
    {
        manufacturer: "Airbus",
        model: "A320",
    },
    {
        manufacturer: "Boeing",
        model: "737",
    },
];

console.log(planes);

const planesText = JSON.stringify(planes);
console.log(planesText);

console.log(JSON.parse(planesText));

// Retrieving JSON content
fetch("https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/movies.json")
    .then(response => response.json())
    .then(movies => {
        // Iterate on the movie array
        movies.forEach(movie => {
            console.log(movie.title);
        });
    })
    .catch(error => {
        console.error(error.message);
    });

//
