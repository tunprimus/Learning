/* The open Star Wars API9 has all the Star Wars data you’ve ever wanted. In this exercise, you’ll show information about some of the planets in the universe.
Write the associated JavaScript code so that a list of links for the first ten planets identifiers (from 1 to 10) is generated automatically. Clicking on a planet link shows information about it.
*/

const PLANETS_TO_VIEW = 10;

const planetLinksElement = document.getElementById("links");
const planetinfosElement = document.getElementById("infos");

// Function to show information about a planet using the API
/* Display
Name:
climate: type. Population: number. Appears in [value] movies(s).
*/
const displayPlanetInfo = (planetId) => {
    fetch(`https://swapi.dev/api/planets/${planetId}`)
        .then(response => response.json())
        .then(planet => {
            console.log(planet);
            // Create needed DOM elements and variables
            const planetNameElement = document.createElement("h3");
            const planetSummaryElement = document.createElement("p");
            const planetMovieCount = planet.films.length;
            // Fill in the information
            planetNameElement.textContent = planet.name;
            planetSummaryElement.textContent = `Climate: ${planet.climate}. Population: ${planet.population}. Appears in ${planetMovieCount} movie(s).`
            // Now add to the display div while clearing any prior info
            planetinfosElement.innerHTML = "";
            planetinfosElement.appendChild(planetNameElement);
            planetinfosElement.appendChild(planetSummaryElement);
        })
        .catch(error => {
            console.error(error.message);
        });
};


// Function to generate links to display planetary info
