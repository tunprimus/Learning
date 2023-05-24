/* Your mission here is to create a showChild() function that shows one of the children of a DOM element node. This function takes as parameter the parent node and the child node index. Error cases like a non-element node or an out of limits index must be taken into account.

Complete the following programme to obtain the expected results.

Use console.error() rather than console.log() to display an error message in the console.
*/

/* Show a DOM object's child node.
"node" is the DOM object
"index" is the index of the child node
*/


const showChild = (node, index) => {
    if (node.nodeType !== document.ELEMENT_NODE) {
        console.error("Wrong node type. Body is NOT an element node!");
    } else if ((index < 0) || (index > node.childNodes.length)) {
        console.error("Incorrect index!");
    } else {
        console.log(node.childNodes[index]);
    }
    
};


/* 
const showChild = (node, index) => {
    if (node.nodeType === document.ELEMENT_NODE) {
        if (index >= 0 && index < node.childNodes.length) {
            console.log(node.childNodes[index]);
        } else {
            console.error("Incorrect index!");
        }
    } else {
        console.error("Wrong node type. Body is NOT an element node!");
    }
};
 */

// Should show h1 node
showChild(document.body, 1);

// Should show "Incorrect index"
showChild(document.body, -1);

// Should show "#text"
showChild(document.body, 8);

// Should show "Incorrect index"
showChild(document.body, 12);

// Should show "Wrong node type"
showChild(document.body.childNodes[0], 0);
