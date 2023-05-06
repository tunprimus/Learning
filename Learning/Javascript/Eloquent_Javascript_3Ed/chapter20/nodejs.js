/* About Node.js from Chapter 20 of the book
*/

/* The File System Module */

/* 
let {readFile} = require("fs");
readFile("file.txt", "utf8", (error, text) => {
    if (error) {
        throw error;
    }
    console.log("The file contains:", text);
});
 */


const {readFile} = require("fs");
readFile("file.txt", (error, text) => {
    if (error) {
        throw error;
    }
    console.log("The file contained", buffer.length, "bytes.", "The first byte is:", buffer[0]);
});

