

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


// Start listening to incoming requests
// If process.env PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
