
// import fetch from "node-fetch";

/* Browsers And HTTP */

console.log(encodeURIComponent("Yes?")); // -> Yes%3F

console.log(decodeURIComponent("Yes%3F")); // → Yes?

/* Fetch */

fetch("example/data.txt").then(response => {
    console.log(response.status); // -> 200
    console.log(response.headers.get("Content-Type")); // -> text/plain
});

fetch("example/data.txt")
    .then(resp => resp.text())
    .then(text => console.log(text)); // -> This is the content of the data.txt


// Fetch uses GET by default; other methods have to be added
fetch("example/data.txt", {method: "DELETE"}).then(resp => {
    console.log(resp.status); // -> 405
});

// One can add a body or headers to the request
fetch("example/data.txt", {headers: {Range: "bytes=8-19"}})
    .then(resp => resp.text())
    .then(console.log); // -> the content


/* Form Fields */

/* Focus */

document.querySelector("input").focus();
console.log(document.activeElement.tagName);

document.querySelector("input").blur();
console.log(document.activeElement.tagName);


/* The Form As A Whole */
// let form = document.querySelector("form");
let form = document.querySelectorAll("form")[2];
console.log(form.elements[1].type); //-> password
console.log(form.elements.password.type); //-> password
console.log(form.elements.name.form === form); // -> true
