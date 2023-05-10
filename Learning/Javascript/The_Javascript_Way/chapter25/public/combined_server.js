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

// Handle form data submission to the "/animals" route
app.post(`/${API_ENDPOINT}/`, upload.array(),(request, response) => {
    const formVariable1 = `request.body.${formVariable1}`;
    const formVariable2 = `request.body.${formVariable2}`;
    response.send(`Hello, you sent ${formVariable1} and ${formVariable2}`);
});


// Handle submission of a JSON array
app.post(`/api/${API_VARIABLE}`, jsonParser, (request, response) => {
    const variable = request.body;
    response.send(`You sent me a list of cars: ${JSON.stringify(variable)}`);
});





// Start listening to incoming requests
// If process.env PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
