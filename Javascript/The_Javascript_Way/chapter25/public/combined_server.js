// Load the Express package as a module
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

// Access the exported services
const app = express();
const upload = multer();
const jsonParser = bodyParser.json();

// Enable CORS
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("public"));

/* Creating an API */

// Return a string for requests to the root URL ("/")
app.get("/", (request, response) => {
    response.send("Hello from Express");
});

// Return the articles list in JSON format
app.get(`/api/${API_VARIABLE}`, (request, response) => {
    response.json(`${API_VARIABLE}`);
});


// Handle form data submission to the "/formVariable" route
app.post(`/${API_ENDPOINT}/`, upload.array(),(request, response) => {
    const formVariable1 = `request.body.${formVariable1}`;
    const formVariable2 = `request.body.${formVariable2}`;
    response.send(`Hello, you sent ${formVariable1} and ${formVariable2}`);
});

// T-shirt colour exercise
let tshirt = null;
let API_ENDPOINT = tshirt;

// Handle form data submission to the "/formVariable" route
app.post(`/${API_ENDPOINT}/`, upload.array(),(request, response) => {
    const formVariable = tshirt;
    const formVariable1 = tshirt.size;
    const formVariable2 = tshirt.color;
    formVariable1 = `request.body.${formVariable1}`;
    formVariable2 = `request.body.${formVariable2}`;
    response.send(`Command received! Size: ${formVariable1} and colour: ${formVariable2}`);
});


// New article exercise
let articles = null;
let API_VARIABLE1 = articles;
app.post(`/api/${API_VARIABLE1}`, upload.array(),(request, response) => {
    const formVariable1 = title;
    const formVariable2 = content;
    formVariable1 = `request.body.${formVariable1}`;
    formVariable2 = `request.body.${formVariable2}`;
    // To get new array of IDs
    const idList = articles.map(article => article.id);
    // Reduce array to single maximal value
    const maxId = idList.reduce((prev, curr) => {
        curr > prev ? curr : prev;
    });
    const id = maxId + 1;
    articles.push({id, formVariable1, formVariable2});
    response.send(`Good work! New articles added successfully with ID ${id}!`);
});

// Return the articles list in JSON format
app.get(`/api/${API_VARIABLE1}`, (request, response) => {
    response.json(`${API_VARIABLE1}`);
});

// Handle submission of a JSON array
app.post(`/api/${API_VARIABLE}`, jsonParser, (request, response) => {
    const variable = request.body;
    response.send(`You sent me a list of cars: ${JSON.stringify(variable)}`);
});


// Visited country exercise
let countries = null;
let API_VARIABLE2 = countries;
app.post(`/api/${API_VARIABLE2}`, jsonParser, (request, response) => {
    countries = request.body;
    response.send(`You (${countries.name}) sent me a list of visited countries: ${JSON.stringify(countries)}`);
});


// Start listening to incoming requests
// If process.env PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
