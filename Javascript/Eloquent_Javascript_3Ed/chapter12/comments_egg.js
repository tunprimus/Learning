/* It would be nice if we could write comments in Egg. For example, whenever we find a hash sign (#), we could treat the rest of the line as a comment and ignore it, similar to // in JavaScript.
We do not have to make any big changes to the parser to support
this. We can simply change skipSpace to skip comments as if they are whitespace so that all the points where skipSpace is called will now also skip comments. Make this change.
*/

// This is the old skipSpace. Modify it...
function skipSpace(string) {
    // Need to match any number of beginning spaces of # characters with all the subsequent characters on that line
    let toSkip = string.match(/^(\s|#.*)*/);
    return string.slice(toSkip[0].length);
}

console.log(parse("# hello\nx"));
  // → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
  // → {type: "apply",
  //    operator: {type: "word", name: "a"},
  //    args: []}
