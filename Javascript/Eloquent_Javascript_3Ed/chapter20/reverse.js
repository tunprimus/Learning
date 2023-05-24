/* About Node.js from Chapter 20 of the book
*/

exports.reverse = function (string) {
    return Array.from(string).reverse().join("");
};
