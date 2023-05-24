/* Improve the RPG to add character inventory management according to the following rules:
- A character inventory contains a number of gold and a number of keys;
- Each character begins with 10 gold and 1 key;
- The character description must show the inventory state;
- When a character slays another character, the victims inventory goes to its vanquisher.
*/

class Character {
    constructor(name, health, strength, gold, keys) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.gold = 10;
        this.keys = 1;
        this.xp = 0;
    }

    attack(target) {
        if (this.health > 0) {
            const damage = this.strength;
            console.log(`${this.name} attacks ${target.name} and causes ${damage} damage points!\n`);
            target.health -= damage;
            if (target.health > 0) {
                console.log(`${target.name} has ${target.health} health points left!\n`);
            } else {
                target.health = 0;
                const bonusXP = 10;
                console.log(`${this.name} eliminated ${target.name} while winning ${bonusXP} experience points, ${target.gold} gold and ${target.keys} key(s)!\n`);
                this.gold += target.gold;
                this.keys += target.keys;
                this.xp += bonusXP;
            }
        } else {
            console.log(`${this.name} can not attack (they have been eliminated!)\n`);
        }
    }

    describe() {
        return `${this.name} has ${this.health} health points, ${this.strength} as strength, ${this.gold} gold, ${this.keys} key(s) and ${this.xp} XP point(s).\n`;
    }
}


const aurora = new Character("Aurora", 150, 25);
const glacius = new Character("Glacius", 130, 30);

console.log("Welcome to the adventure! Here are our heroes:");
console.log(aurora.describe());
console.log(glacius.describe());

const monster = new Character("Spike", 40, 20);
console.log("A wild monster has appeared: it's named " + monster.name);

monster.attack(aurora);
console.log(aurora.describe());

monster.attack(glacius);
console.log(glacius.describe());

aurora.attack(monster);
console.log(monster.describe());

glacius.attack(monster);
console.log(monster.describe());

console.log(aurora.describe());
console.log(glacius.describe());
