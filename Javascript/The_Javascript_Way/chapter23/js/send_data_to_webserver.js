

/* Sending Form Data */

// Handle form submission
document.querySelector("form").addEventListener("submit", event => {
    // Cancel default behaviour of sending a synchronous POST request
    event.preventDefault();
    // Create a FormData object, passing the form as a parameter
    const formData = new FormData(event.target);
    // Send form data to the server with an asynchronous POST request
    const url1 = "https://thejsway-server.herokuapp.com/animals";
    fetch(url1, {
        method: "POST",
        body: formData,
    })
        .then(response => response.text())
        .then(result => {
            document.getElementById("result").textContent = result;
        })
        .catch(error => {
            console.error(error.message);
        });
});


/* Using FormData object independently of any form */
document.getElementById("buyButton").addEventListener("click", () => {
    // Create a new, empty FormData object
    const formData = new FormData();
    // Fill the object with key-value pairs
    formData.append("size", "L");
    formData.append("color", "blue");
    // Send data to the server
    const url2 = "https://thejsway-server.herokuapp.com/tshirt";
    fetch(url2, {
        method: "POST",
        body: formData,
    })
        .then(response => response.text())
        .then(result => {
            document.getElementById("result").textContent = result;
        })
        .catch(error => {
            console.error(error.message);
        });
});


/* Sending JSON Data */

// Create an array containing two objects
const cars = [
    {
        model: "Peugeot",
        color: "blue",
        registration: 2012,
        checkups: [2015, 2017],
    },
    {
        model: "Citroën",
        color: "white",
        registration: 1999,
        checkups: [2003, 2005, 2007, 2009, 2011, 2013],
    },
];

// Send this array as JSON data to the server
const url3 = "https://thejsway-server.herokuapp.com/api/cars";
fetch(url3, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(cars),
})
    .then(response => response.text())
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error.message);
    });
