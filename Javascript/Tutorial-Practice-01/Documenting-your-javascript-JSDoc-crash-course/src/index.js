// @ts-check
const { add, multiply, subtract, divide } = require('./calculator');

/**
 * @file index.js is the root file for this example app
 * @author Brad Traversy
 * @see <a href="https://traversymedia.com/">Traversy Media</a>
 */

/**
 * Student Name
 * @type {string}
 */
const studentName = 'John Doe';

/**
 * Array of grades
 * @type {Array<number>}
 */
const grades = [98, 97.7, 76, 89,];

/**
 * Todo object
 * @type {{id: number|string, text: string}}
 */
const todo = {
  id: 1,
  text: 'Hello',
};

/**
 * Calculate tax
 * @param {number} amount - Total amount
 * @param {number} tax - Tax percentage
 * @returns {string} - Total with a dollar sign
 */
const calculateTax = (amount, tax) => {
  return `$${amount + tax * amount}`;
};

console.log(calculateTax(100, 0.1));

/**
 * A student
 * @typedef {Object} Student
 * @property {Number} id - Student ID
 * @property {String} name - Student name
 * @property {Number|String} [age] - Student age (optional)
 * @property {boolean} isActive - Student is active
 */

/**
 * @type {Student}
 */
const student = {
  id: 1,
  name: 'John Doe',
  age: 20,
  isActive: true,
};

/**
 * Class to create a person object
 */
class Person {
  /**
   * 
   * @param {Object} personInfo - Information about the person
   */
  constructor(personInfo) {
    /**
     * @property {String} name - Name of the person
     */
    this.name = personInfo.name;
    /**
     * @property {String} age - Age of the person
     */
    this.age = personInfo.age;
  }

  /**
   * @property {Function} greet - A greeting with the name and age
   * @returns {void}
   */
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
  }
}

/**
 * See {@link Person}
 */
const person1 = new Person({
  name: 'John Doe',
  age: 34,
});
console.log(person1.greet());

console.log(add(20, 30));
