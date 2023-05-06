/* Write a Node script that can be run from the command line and acts somewhat like grep. It treats its first command line argument as a regular expression and treats any further arguments as files to search. It should output the names of any file whose content matches the regular expression.
When that works, extend it so that when one of the arguments is a directory, it searches through all files in that directory and its subdirectories.
Use asynchronous or synchronous file system functions as you see fit. Setting things up so that multiple asynchronous actions are requested at the same time might speed things up a little, but not a huge amount, since most file systems can read only one thing at a time.
*/

const {statSync, readdirSync, readFileSync} = require("fs");

let argRegex = new RegExp(process.argv[2]);

let restOfArg = process.argv.slice(3);

function findFile(file) {
    let stats = statSync(file);
    if (stats.isDirectory()) {
        for (let f of readdirSync(file)) {
            findFile(file + "/" + f);
        }
    } else if (argRegex.test(readFileSync(file, 'utf8'))) {
        console.log(file);
    }
}

for (let arg of restOfArg) {
    findFile(arg);
}
