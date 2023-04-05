/* The TV show Game of Thrones is about the struggle for power between several noble families.
In this exercise, you’ll have to show characters belonging to the house selected by the user.
Complete this code so that:
• The house dropdown list is filled during page load.
• The list of characters is shown whenever the user selects a new house in the list.
*/

// Character list. Each house has a name and a code
const houses = [
    {
        code: "ST",
        name: "Stark"
    },
    {
        code: "LA",
        name: "Lannister"
    },
    {
        code: "BA",
        name: "Baratheon"
    },
    {
        code: "TA",
        name: "Targaryen"
    }
];

// Return an array of characters belonging to a house
const getCharacters = houseCode => {
    switch (houseCode) {
    case "ST":
        return ["Eddard", "Catelyn", "Robb", "Sansa", "Arya", "Jon Snow"];
    case "LA":
        return ["Tywin", "Cersei", "Jaime", "Tyrion"];
    case "BA":
        return ["Robert", "Stannis", "Renly"];
    case "TA":
        return ["Aerys", "Daenerys", "Viserys"];
    default:
        return []; // Empty array
    }
};

