// Complete the following program to compute and show the names of political forms ending with "cy".

const governmentForms = [
    {
    name: "Plutocracy",
    definition: "Rule by the wealthy"
    },
    {
    name: "Oligarchy",
    definition: "Rule by a small number of people"
    },
    {
    name: "Kleptocracy",
    definition: "Rule by the thieves"
    },
    {
    name: "Theocracy",
    definition: "Rule by a religious elite"
    },
    {
    name: "Democracy",
    definition: "Rule by the people"
    },
    {
    name: "Autocracy",
    definition: "Rule by a single person"
    }
];

const names = forms => forms.map(form => form.name);
const filter = (forms, func) => forms.filter(func);
const endingWithCy = form => form.name.endsWith("cy");

console.log(names(filter(governmentForms, endingWithCy)));
