/* The document.getElementsByTagName method returns all child elements with a given tag name. Implement your own version of this as a function that takes a node and a string (the tag name) as arguments and returns an array containing all descendant element nodes with the given tag name.
To find the tag name of an element, use its nodeName property. But note that this will return the tag name in all uppercase. Use the toLowerCase or toUpperCase string methods to compensate for this.
*/

function byTagName(node, tagName) {
    let found = [];
    tagName = tagName.toUpperCase();

    function explorer(node) {
        // Loop through the descendants
        for (let i = 0; i < node.childNodes.length; i++) {
            let child = node.childNodes[i];
            if ((child.nodeType === document.ELEMENT_NODE) && (child.nodeName === tagName)) {
                found.push(child);
                // explorer(child);
            }
            explorer(child);
        }
    }
    explorer(node);
    return found;
}

console.log(byTagName(document.body, "h1").length); // → 1
console.log(byTagName(document.body, "span").length); // → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length); // → 2
