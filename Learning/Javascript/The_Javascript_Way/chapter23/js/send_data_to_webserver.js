

/* Sending Form Data */

// Handle form submission
document.querySelector("form").addEventListener("submit", event => {
    // Cancel default behaviour of sending a synchronous POST request
    event.preventDefault();
    // Create a FormData object, passing the form as a parameter
    const formData = new FormData(event.target);
    // Send form data to the server with an asynchronous POST request
    const url = "https://thejsway-server.herokuapp.com/animals";
    fetch(url, {
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
    const url = "https://thejsway-server.herokuapp.com/tshirt";
    fetch(url, {
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

