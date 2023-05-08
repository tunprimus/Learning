/* Loading A Module */

// Load the module "greetings.js"
const greetings = require("./greetings.js");

// Use exported functions
console.log(greetings.sayHello("Baptiste"));
console.log(greetings.flatter());
// console.log(greetings.sayGoodbye("Baptiste"));

const calculator = require("./calculator.js");

// Create an object by calling the exported function of this module
const calc = calculator();

// Use the object's methods
console.log(`2 + 3 = ${calc.add(2, 3)}`);

// Notice the first uppercase letter, since User is a class
const User = require("./user.js");

// Create an object from this class
const johnDoe = new User("John", "Doe");
// Use the created object
console.log(johnDoe.describe());

/* Using A Dependency */

// Load the npm semver package as a module
// Notice the omission of "./" since the package was installed in node_modules
const semver = require("semver");

// Check if specific versions satisfy a range
console.log(semver.satisfies("2.19.0", "^2.18.1"));
console.log(semver.satisfies("3.0.0", "^2.18.5"));
