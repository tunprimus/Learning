//
const Account = require("./accounting.js");

const myAccount = new Account("Jeff");
myAccount.credit(150);

console.log(myAccount.describe());