const moment = require("moment");

// Format current date
console.log(moment().format("dddd Do MMMM YYYY"));

// Compute the number of years since a given date
console.log(moment("1976-11-26").fromNow());