
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

// Prevent submit
let form2 = document.querySelectorAll("form")[3];
form2.addEventListener("submit", event => {
    console.log("Saving value", form.elements.value.value);
    event.preventDefault();
});


/* Text Fields */


let textarea = document.querySelector("textarea");
textarea.addEventListener("keydown", event => {
    // The keycode for F2 is 113
    if (event.keyCode === 113) {
        replaceSelection(textarea, "Khasekhemwy");
        event.preventDefault();
    }
});
function replaceSelection(field, word) {
    let from = field.selectionStart;
    let to = field.selectionEnd;
    field.value = field.value.slice(0, from) + word + field.value(to);
    // Put the cursor after the word
    field.selectionStart = from + word.length;
    field.selectionEnd = from + word.length;
}

// Display current length of text in the field
let text = document.querySelectorAll("input")[12];
// console.log(text);
let output = document.querySelector("#length");
text.addEventListener("input", () => {
    output.textContent = text.value.length;
});


/* Checkboxes And Radio Buttons */


let checkbox = document.querySelector("#purple");
checkbox.addEventListener("change", () => {
    document.body.style.background = checkbox.checked ? "mediumpurple" : "";
});

let buttons = document.querySelectorAll("[name=colour]");
for (let button of Array.from(buttons)) {
    button.addEventListener("change", () => {
        document.body.style.background = button.value;
    });
}


/* Select Fields */


let select = document.querySelectorAll("select")[1];
let output2 = document.querySelector("#output");
select.addEventListener("change", () => {
    let number = 0;
    for (let option of Array.from(select.options)) {
        if (option.selected) {
            number += Number(option.value);
        }
    }
    output2.textContent = number;
});


/* File Fields */


let input = document.querySelectorAll("input")[17];
// console.log(input);
input.addEventListener("change", () => {
    if (input.files.length > 0) {
        let file = input.files[0];
        console.log("You chose", file.name);
        if (file.type) {
            console.log("It has type", file.type);
        }
    }
});

let input2 = document.querySelectorAll("input")[18];
input2.addEventListener("change", () => {
    for (let file of Array.from(input2.files)) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            console.log("File", file.name, "starts with", reader.result.slice(0, 20));
        });
        reader.readAsText(file);
    }
});

function readFileText(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", () => reject(reader.error));
        reader.readAsText(file);
    });
}

/* Storing Data Client-Side */

localStorage.setItem("username", "marijn");
console.log(localStorage.getItem("username")); // -> marijn
localStorage.removeItem("username");


// Crude note-taking application
let list = document.querySelectorAll("select")[2];
// console.log(list);
let note = document.querySelectorAll("textarea")[2];
// console.log(note);
let state = null;
function setState(newState) {
    list.textContent = "";
    for (let name of Object.keys(newState.notes)) {
        let option = document.createElement("option");
        option.textContent = name;
        if (newState.selected === name) {
            option.selected = true;
        }
        list.appendChild(option);
    }
    note.value = newState.notes[newState.selected];

    localStorage.setItem("Notes", JSON.stringify(newState));
    state = newState;
}
setState(JSON.parse(localStorage.getItem("Notes")) || {
    notes: {"shopping list": "Carrots\nRaisins"},
    selected: "shopping list"
});

list.addEventListener("change", () => {
    setState({notes: state.notes, selected: list.value});
});
note.addEventListener("change", () => {
    setState({
        notes: Object.assign({}, state.notes, {[state.selected]: note.value}),
        selected: state.selected
    });
});
document.querySelectorAll("button")[6].addEventListener("click", () => {
    let name = prompt("Note name");
    if (name) {
        setState({notes: Object.assign({}, state.notes, {[name]: ""}),
            selected: name
        });
    }
});
// console.log(document.querySelectorAll("button"));
