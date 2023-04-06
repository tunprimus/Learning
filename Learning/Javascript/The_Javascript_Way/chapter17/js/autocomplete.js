/* In this exercise, you’ll have to assist the user in selecting a country. As he enters the country name in an input box, the page shows a list of corresponding countries. Clicking on a suggested country replaces the value in the input box.
*/

const countryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua-and-Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan"
];

/* 
// Add class to suggestion
const suggestionsElement = document.getElementById("suggestions");
suggestionsElement.classList.add("suggestion");
console.log(suggestionsElement);

// Create a select element to hold the options and generate click/change events later
const selectElement = document.createElement("select");

// Create and return an HTML option tag
const createOptionElement = (value) => {
    const optElement = document.createElement("option");
    optElement.textContent = value;
    optElement.value = value;
    return optElement;
};

// Create and append a dummy default value to the select element as its first child
selectElement.appendChild(createOptionElement(""));

// Populate the select element with the countries
countryList.forEach(item => {
    selectElement.appendChild(createOptionElement(item));
});

// Add to the div element
suggestionsElement.appendChild(selectElement);
 */

