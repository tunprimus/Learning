/* Improve the previous Punk API example to display additional information about the showcased beer : alcohol by volume (ABV), volume and date of first brewage.

[
    {
        id: 303,
        name: 'Hazy Jane Rye Barrel Aged',
        tagline: 'Bourbon Barrel Vermont IPA.',
        first_brewed: '2018',
        description: 'A draft-only BrewDog bar exclusive; we have experimented with ageing our Vermount IPA for a short time in bourbon and rye barrels, both known for imparting flavour quickly compared to other types of barrel.',
        image_url: 'https://images.punkapi.com/v2/keg.png',
        abv: 7.2,
        ibu: 30,
        target_fg: 1009,
        target_og: 1065,
        ebc: 15,
        srm: 8,
        ph: 4.2,
        attenuation_level: 86,
        volume: { value: 20, unit: 'litres' },
        boil_volume: { value: 25, unit: 'litres' },
        method: { mash_temp: [Array], fermentation: [Object], twist: null },
        ingredients: {
            malt: [Array],
            hops: [Array],
            yeast: 'Wyeast 1056 - American Ale™'
        },
        food_pairing: [
            'Chickpea curry',
            'Pork fajitas (with the works!)',
            'Orange and carrot cake with orange cream cheese icing'
        ],
        brewers_tips: 'Avoid any oxygen uptake! It will oxidise the delicate hop flavours during the ageing period. Purge your barrel/ageing vessel with CO2 and seal it airtight.',
        contributed_by: 'John Jenkman <johnjenkman>'
    }
]


*/

const url = "https://api.punkapi.com/v2/beers/random";
const beerElement = document.getElementById("beer");
const nameElement = document.getElementById("name");
const descriptionElement = document.getElementById("description");
const abvElement = document.getElementById("abv");
const volumeElement = document.getElementById("volume");
const firstBrewElement = document.getElementById("first-brew-date");

const grabMoreBeer = () => {
    fetch(url)
        .then(response => response.json())
        .then(beers => {
            // Can only use first array element due to rate-limiting by API
            const beer = beers[0];
            // Need to clear prior information on the page
            const spansElement = document.querySelectorAll("span");
            spansElement.forEach(spanElement => {
                spanElement.innerHTML = "";
            });
            // Now add required values from beer object
            nameElement.textContent = beer.name;
            descriptionElement.textContent = beer.description;
            abvElement.textContent = beer.abv;
            volumeElement.textContent = `${beer.volume.value} ${beer.volume.unit}`;
            firstBrewElement.textContent = beer.first_brewed;
        })
        .catch(error => {
            console.error(error.message);
        });
}

const buttonElement = document.getElementById("grabButton");
buttonElement.addEventListener("click", grabMoreBeer);
