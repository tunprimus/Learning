/* Modified from : Vanilla JavaScript Project: Building a Country Info App Using Fetch API
Developer: Code With Mayank */

const dropdownElement = document.querySelector('#dropdown');
const infoElement = document.querySelector('.info');
const countryFlagElement = document.querySelector('.country-flag');
const countryNameElement = document.querySelector('.country-name');
const countryCapitalElement = document.querySelector('.country-capital__text');
const countryCurrencyElement = document.querySelector('.country-currency__text');
const countryPopulationElement = document.querySelector('.country-population__text');
const countryRegionElement = document.querySelector('.country-region__text');

const OFFLINE_URL = `../../../../assets/JSONs/restcountries-all.json`;
const ONLINE_URL = `https://restcountries.com/v3.1/all`;

let sortedData;
let bufferedData = [];

const apiCalls = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchJSON = async (url1, url2 = null) => {
  try {
    const response = await fetch(url1) || fetch(url2);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

function getData(obj) {
  bufferedData.push(obj);
  // console.log(bufferedData);
  return bufferedData;
}

const populateDropdown = async () => {
  // const data = await apiCalls(DATA_URL);
  const data = await fetchJSON(OFFLINE_URL);
  
  const fragment = new DocumentFragment();

  sortedData = data.sort((a, b) => (a.name.common).localeCompare(b.name.common));

  sortedData.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.name.common;
    option.text = country.name.common;
    fragment.appendChild(option);
  });
  dropdownElement.appendChild(fragment);
  getData(sortedData);
};

const getCountryData = async (url1, url2) => {
  let singleCountryData = await fetchJSON(url1, url2);
  console.log(singleCountryData);
  singleCountryData = singleCountryData[0];
  countryNameElement.innerText = singleCountryData.name;
  countryFlagElement.src = singleCountryData.flag;
  countryFlagElement.alt = singleCountryData.flags.alt;
  countryCapitalElement.innerText = singleCountryData.capital;
  countryCurrencyElement.innerText = singleCountryData.currencies[0].name;
  countryPopulationElement.innerText = singleCountryData.population;
  countryRegionElement.innerText = singleCountryData.region;
  infoElement.style.display = 'block';
};

/* Modified from: javascript - find nested object key by its value | --->>> https://stackoverflow.com/a/52526922 */

function getCountryKeyFromValue(obj, val) {

  let result = Object.keys(obj).find(key => {
    if(obj[key].name.common === val)
      return key;
  });
  return result;
}

const countrySelected = (evt) => {
  const country = evt.target.value;
  
  let buffer = Object.assign({}, ...bufferedData);
  console.log(buffer);
  const countryKey = getCountryKeyFromValue(buffer, country);
  // console.log(countryKey);
  if (country !== 'Select') {
    const offlineURL = `buffer[${countryKey}]`;
    // console.log( offlineURL );
    const onlineURL = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
    const url = `${offlineURL} || ${onlineURL}`;
    getCountryData(offlineURL, onlineURL);
  } else {
    infoElement.style.display = 'none';
  }
};

dropdownElement.addEventListener('change', countrySelected);
document.addEventListener('DOMContentLoaded', populateDropdown);
