// Complete the following programme to add the circle object definition. Its radius value is input by the user.

const r = Number(prompt("Enter the circle radius:"));
// let circumference = 2 * Math.PI * r;

const circle = {
    radius: r,
    circumference() {
        return 2 * Math.PI * r;
    },
    area() {
        return Math.PI * r**2;
    },
    // Return model description
    describe() {
        return `Its circumference is ${this.circumference} and the area is ${this.area}`;
    }
};

console.log(`Its circumference is ${circle.circumference()}`);
console.log(`Its area is ${circle.area()}`);
