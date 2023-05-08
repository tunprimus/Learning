/* Create a circle.js module exporting two functions circumference() and area(), each taking the circle radius as a parameter.
Load this module in a index.js file and test the two functions
*/

module.exports.circumference = radius => 2 * Math.PI * radius;

module.exports.area = radius => radius ** 2 * Math.PI;