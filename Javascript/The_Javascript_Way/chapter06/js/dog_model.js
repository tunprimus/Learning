// Complete the following programme to add the dog object definition

const dog = {
    name: "Fang",
    species: "boarhound",
    size: 75,
    bark() {
        return "Grrr! Grrr!";
    },
    // Return the model description
    describe() {
        return `${this.name} is a ${this.species} dog measuring ${this.size}.`;
    }
};

console.log(`${dog.name} is a ${dog.species} dog measuring ${dog.size}`);
console.log(`Look, a cat! ${dog.name} barks: ${dog.bark()}`);
