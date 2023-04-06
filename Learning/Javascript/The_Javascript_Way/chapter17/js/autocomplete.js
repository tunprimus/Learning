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

const inputElement = document.querySelector("input");
const suggestionsElement = document.getElementById("suggestions");

// Create and return list of suggestions as div elements
const suggestionMakerElement = item => {
    const suggestElement = document.createElement("div");
    suggestElement.classList.add("suggestion");
    suggestElement.textContent = item;

    // Add click functionality
    suggestElement.addEventListener("click", event => {
        // Replace input with suggested item
        inputElement.value = event.target.textContent;
        // Empty the suggestion list
        suggestionsElement.innerHTML = "";
    });
    return suggestElement;
};

inputElement.addEventListener("input", () => {
    // Ensure empty suggestion list
    suggestionsElement.innerHTML = "";
    // Pass each country/item to add to the suggestions
    countryList.forEach(item => {
        // Check if input value matches start of the item
        if (item.startsWith(inputElement.value)) {
            suggestionsElement.appendChild(suggestionMakerElement(item));
        }
    });
});
