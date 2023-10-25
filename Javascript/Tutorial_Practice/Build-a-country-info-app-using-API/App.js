/* Modified from : Vanilla JavaScript Project: Building a Country Info App Using Fetch API
Developer: Code With Mayank */

const dropdownElement = document.querySelector('#dropdown');
const infoElement = document.querySelector('.info');
const countryNameElement = document.querySelector('.country-name');
const countryCapitalElement = document.querySelector('.country-capital__text');
const countryCurrencyElement = document.querySelector('.country-currency__text');
const countryPopulationElement = document.querySelector('.country-population__text');
const countryRegionElement = document.querySelector('.country-region__text');

// const URL = `https://restcountries.com/v3.1/all`;
const DATA_URL = `../../../../assets/JSONs/restcountries-all.json`;

const apiCalls = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const populateDropdown = async () => {
  const data = await apiCalls(DATA_URL);
  
  const fragment = new DocumentFragment();

  const sortedData = data.sort((a, b) => (a.name.common).localeCompare(b.name.common));

  sortedData.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.name.common;
    option.text = country.name.common;
    fragment.appendChild(option);
  });
  dropdownElement.appendChild(fragment);

};

document.addEventListener('DOMContentLoaded', populateDropdown);
