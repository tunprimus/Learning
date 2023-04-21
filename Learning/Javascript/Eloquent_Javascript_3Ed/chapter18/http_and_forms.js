

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


// Fetch uses GET by default
fetch("example/data.txt", {method: "DELETE"}).then(resp => {
    console.log(resp.status); // -> 405
});
