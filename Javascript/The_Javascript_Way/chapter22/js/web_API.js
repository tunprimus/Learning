

/* Calling An API With JavaScript */

fetch("https://thejsway-server.herokuapp.com/api/articles")
    .then(response => response.json())
    .then(articles => {
        articles.forEach(article => {
            // Create title element
            const titleElement = document.createElement("h3");
            titleElement.textContent = article.title;
            // Create content element
            const contentElement = document.createElement("p");
            contentElement.textContent = article.content;
            // Add title and content to the page
            const articlesElement = document.getElementById("articles");
            articlesElement.appendChild(titleElement);
            articlesElement.appendChild(contentElement);
        });
    })
    .catch(error => {
        console.error(error.message);
    });

/* Open APIs */

// Anonymous function for retrieving and displaying a random beer
const grabRandomBeer = () => {
    // Fetching random beer data from the API
    fetch("https://api.punkapi.com/v2/beers/random")
        .then(response => response.json())
        .then(beers => {
            // API returns an array containing only one element: we get it
            const beer = beers[0];
            // Creating DOM element for some beer properties
            const nameElement = document.createElement("h2");
            nameElement.textContent = beer.name;
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = beer.description;
            // Clear previous beer data
            const beerElement = document.getElementById("beer");
            beerElement.innerHTML = "";
            // Add new beer info to the page
            beerElement.appendChild(nameElement);
            beerElement.appendChild(descriptionElement);
        })
        .catch(error => {
            console.error(error.message);
        });
};

// Grab a new beer by clicking the button
document.getElementById("grabButton").addEventListener("click", grabRandomBeer);


/* Key-based Authentication */

fetch("http://api.wunderground.com/api/YOUR_OWN_KEY/conditions/q/france/bordeaux.json")
    .then(response => response.json())
    .then(weather => {
        // Access some weather properties
        const location = weather.current_observation.display_location.full;
        const temperature = weather.current_observation.temp_c;
        const humidity = weather.current_observation.relative_humidity;
        const imageUrl = weather.current_observation.icon_url;
        // Create DOM elements for properties
        const summaryElement = document.createElement("div");
        summaryElement.textContent = `Temperature is ${temperature} °C with ${humidity} humidity.`;
        const imageElement = document.createElement("img");
        imageElement.src = imageURL;
        // Add location to title
        document.querySelector("h2").textContent += `${location}`;
        // Add elements to the page
        const weatherElement = document.getElementById("weather");
        weatherElement.appendChild(summaryElement);
        weatherElement.appendChild(imageElement);
    })
    .catch(error => {
        console.error(error.message);
    });
