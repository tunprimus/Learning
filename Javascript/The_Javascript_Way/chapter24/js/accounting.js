/* Exporting An Accounting Class */

module.exports = class Account {
    constructor(name) {
        this.name = name;
        this.balance = 0;
    }
    // Add amount to the account balance
    credit(amount) {
        this.balance += amount;
    }
    // Return the account details
    describe() {
        return `owner: ${this.name}, balance: ${this.balance}`;
    }
};