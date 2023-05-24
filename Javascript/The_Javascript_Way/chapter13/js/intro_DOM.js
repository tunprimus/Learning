const h = document.head;
const b = document.body;

if (document.body.nodeType === document.ELEMENT_NODE) {
    console.log("Body is an element node!");
} else {
    console.log("Body is a textual node!");
}

console.log(document.body.childNodes[0]);
console.log(document.body.childNodes[1]);

// Browse the body node´s children using a for loop
for (let i = 0; i < document.body.childNodes.length; i++) {
    console.log(document.body.childNodes[i]);
}

// Browse the body node´s children using the forEach() method
document.body.childNodes.forEach(node => {
    console.log(node);
});

// Browse the body node´s children using a for-of loop
for (const node of document.body.childNodes) {
    console.log(node);
}

const h1 = document.body.childNodes[1];
console.log(h1.parentNode); // -> Shows the body node
console.log(document.parentNode); // -> Will show null, since body has no parent node

