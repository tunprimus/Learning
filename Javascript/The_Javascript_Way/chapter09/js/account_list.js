/* Let’s build upon a previous account object exercise. A bank account is still defined by:
- A name property;
- A balance property, initially set to 0;
- A credit method adding the value passed as an argument to the account balance;
- A describe method returning the account description.

Write a programme that creates three accounts: one belonging to Sean, another to Brad and the third one to Georges. These accounts are stored in an array. Next, the program credits 1000 to each account and shows its description.
*/

class Account {
    constructor(name, amount) {
        this.name = name;
        this.balance = 0;
        this.amount = amount;
    }

    credit(amount) {
        this.balance += Number(`${amount}`);
        return this.balance;
    }

    describe() {
        return `owner: ${this.name}, balance: ${this.balance}`;
    }
}

function createAccounts(ownerArray, amountArray) {
    let accountsArray = [];
    for (let i = 0; i < ownerArray.length; i++) {
        let account = new Account(ownerArray[i]);
        account.balance = account.credit(amountArray[i]);
        delete account.amount;
        accountsArray.push(account);
    }
    return accountsArray;
}

console.log(createAccounts(["Sean", "Brad", "Georges"], [1000, 1000, 1000]));
console.log("\n=======\n");
console.log(createAccounts(["Connery", "Pitt", "Luke"], [500, 9000, 2000]));
