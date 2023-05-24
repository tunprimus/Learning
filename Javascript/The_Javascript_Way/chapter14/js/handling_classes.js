/*
Improve the previous programme to add a has() function that tests if an element designated by its ID has a class. The function shows true, false or an error message if the element can’t be found.

Use console.error() rather than console.log() to display an error message in the console.
*/

// Show if an element has a class
const has = (id, someClass) => {
    if (document.getElementById(id)) {
        console.log(document.getElementById(id).classList.contains(someClass));
    } else {
        console.error(`No element has id ${id}.`);
    }
    // console.log(document.querySelector(id));
};

has("saxophone", "woodwind"); // -> Should show true
has("saxophone", "brass"); // -> Should show false
has("trumpet", "brass"); // -> Should show true
has("contrabass", "chordophone"); // -> Should show an error message
