

/* Responding To Requests */

// Load the Express package as a module
const express = require("express");

// Access the exported service
const app = express();

// Return a string for requests to the root URL ("/")
app.get("/", (request, response) => {
    response.send("Hello from Express");
});


/* Creating an API */

// Enable CORS
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/* Exposing Data */

// Define an article list
const articles = [
    { id: 1, title: "First article", content: "Hello World!" },
    {
        id: 2,
        title: "Lorem ipsum",
        content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit mauris ac porttitor accumsan. Nunc vitae pulvinar odio, auctor interdum dolor. Aeneansodales dui quis metus iaculis, hendrerit vulputate lorem vestibulum."
    },
    {
        id: 3,
        title: "Lorem ipsum in French",
        content:
        "J’en dis autant de ceux qui, par mollesse d’esprit, c’est-à-dire par la crainte de la peine et de la douleur, manquent aux devoirs de la vie. Et il est très facile de rendre raison de ce que j’avance."
    }
];

// Return the articles list in JSON format
app.get("/api/articles", (request, response) => {
    response.json(articles);
});


/* Accepting Data */

/* Handling Form Data */
// Load the multer package as a module
const multer = require("multer");

// Access the exported services
const upload = multer();

// Handle form data submission to the "/animals" route
app.post("/animals", upload.array(),(request, response) => {
    const name = request.body.name;
    const vote = request.body.strongest;
    response.send(`Hello ${name}, you voted: ${vote}`);
});

/* Handling JSON Data */

// Load the body parser package as a module
const bodyParser = require("body-parser");

// Access the JSON parsing service
const jsonParser = bodyParser.json();

// Handle submission of a JSON car array
app.post("/api/cars", jsonParser, (request, response) => {
    const cars = request.body;
    response.send(`You sent me a list of cars: ${JSON.stringify(cars)}`);
});


/* Publishing Web Pages */

/* 
// Return HTML content for requests to "/hello"
app.get("/hello", (request, response) => {
    const htmlContent = `<!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Hello Web Page</title>
        </head>
        <body>
            Hello!
        </body>
        </html>`;
    response.send(htmlContent);
});
 */

// Return a web page for requests to "/hello"
app.get("/hello", (request, response) => {
    // response.sendFile(`${__dirname}/html/views/hello.html`);
    // response.sendFile(`../html/views/hello.html`);
    response.sendFile(`/home/pr0f33/zzz_personal/Learning/Javascript/The_Javascript_Way/chapter25/html/views/hello.html`);
});

// Update the "content" DOM element
document.getElementById("content").textContent = "Hello from JavaScript!";

// Serve content of the "public" subfolder directly
app.use(express.static("public"));

/* ================= */

// Start listening to incoming requests
// If process.env PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});

