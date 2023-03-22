/*
*/

/* Moving Through The Tree */

// Function scans a document for string in a recursive manner
function talksAbout(node, string) {
    // Checks if the node exists
    if (node.nodeType === node.ELEMENT_NODE) {
        // Confirms that the node has text
        for (let child of node.childNodes) {
            // Makes a recursive call again
            if (talksAbout(child, string)) {
                return true;
            }
        }
        return false;
    } else if (node.nodeType === node.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
    }
}
console.log(talksAbout(document.body, "book")); // -> true


/* Finding Elements */

// Getting the 1st link element
let link = document.body.getElementsByTagName("a")[0];
console.log(link.href);

// Finding a specific single node via id
let ostrich = document.getElementById("gertrude");
console.log(ostrich.src);

/* Changing The Document */

/* 
- remove method removes a child node from its parent node
- insertBefore method adds a child node (1st argument) as 1st child of an element node (2nd argument)
- appendChild method adds a child node to the end of list of children of an element node
- replaceChild method is called upon an element node and replaces a current child node (2nd argument) with a new child node (1st argument)
*/
// Insert node (1st argument) ahead of another node (2nd argument)
let paragraphs = document.body.getElementsByTagName("p");
// console.log(paragraphs);
// document.body.insertBefore(paragraphs[2], paragraphs[0]);
document.body.insertBefore(paragraphs[6], paragraphs[4]);


/* Creating Nodes */

// Replace images (<img> tags) with text in their alt attributes
function replaceImages() {
    let images = document.body.getElementsByTagName("img");
    // Go in reverse to preserve order because of live reload
    for (let i = images.length - 1; i >= 0; i--) {
        let image = images[i];
        if (image.alt) {
            let text = document.createTextNode(image.alt);
            image.parentNode.replaceChild(text, image);
        }
    }
}

// Way to convert nodeList to real array
let arrayish = {0: "one", 1: "two", length: 2};
let array = Array.from(arrayish);
console.log(array.map(s => s.toUpperCase())); // -> ["ONE", "TWO"]

// Create element nodes with document.createElement - takes a tag name and returns a new empty node of the same type

// Function to add quotes
function elt(type, ...children) {
    let node = document.createElement(type);
    for (let child of children) {
        if (typeof child != "string") {
            node.appendChild(child);
        } else {
            node.appendChild(document.createTextNode(child));
        }
    }
    return node;
}

document.getElementById("quote").appendChild(elt("footer", "-", elt("strong", "Karl Popper"), ", preface to the second edition of ", elt("em", "The Open Society and Its Enemies"),", 1950"));


/* Attributes */

// One can create custom attributes for a node and use getAttribute and setAttribute methods to manipulate them

let paras = document.body.getElementsByTagName("p");
for (let para of Array.from(paras)) {
    if (para.getAttribute("data-classified") === "secret") {
        para.remove();
    }
}

// Prefix such custom attributes with "data-"


/* Layout */

// offsetWidth and offsetHeight properties give the space taken up by an element in pixels
// clientWidth and clientHeight properties give the space inside the element, ignoring border width

// let para = document.body.getElementsByTagName("p")[0];
let para = document.body.getElementsByTagName("p")[10];
console.log("clientHeight:", para.clientHeight);
console.log("offsetHeight:", para.offsetHeight);
// console.log(para.length);

