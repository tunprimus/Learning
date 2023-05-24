/* Write the HTML code that shows input fields for creating a new blog article by entering its title and content.
Then, write the associated JavaScript code to send the article fields as form data to the URL https://thejsway-server.herokuapp.com/articles. You should receive a confirmation message from the server and display it on the page.
*/



const formElement = document.getElementById("article-form");
const titleElement = document.getElementById("title");
const contentElement = document.getElementById("content");
const submitElement = document.getElementById("submit");
const resultElement = document.getElementById("result");
const resultTextElement = document.getElementById("result-text");

formElement.addEventListener("submit", event => {
    // Prevent the form from being submitted synchronously
    // event.preventDefault();

    // Create a FormData object, passing the form as a parameter
    console.log(event.target);
    const formData = new FormData(event.target);
    console.log(formData);
    // Send form data to the server with an asynchronous POST request
    const url = "https://thejsway-server.herokuapp.com/articles";
    fetch(url, {
        method: "POST",
        body: formData,
    })
        .then(response => response.text())
        .then(result => {
            resultTextElement.textContent = result;
        })
        .catch(error => {
            console.error(error.message);
        });
});
