/**
 * @description Enhance your Coding with JSDoc
 * @author Steve Griffith - Prof3ssorSt3v3
 */

/**
 * App Module
 * @module /app.js
 * 
 * @author Steve Griffith <steve@home.org>
 * @version 0.1.2
 * @description The init method is exported anc once called will add the click event listener to start the api fetch and then build the display of the products
 * 
 * See [Getting Started]{@tutorial overview} to learn how to use app.js
 */

/**
 * @constant {string} baseURL - base portion of API url
 */
const baseURL = 'https://cool.dev/api';

/**
 * @enum {Set.<string>} - list of possible colour values to be used
 */
const COLOURS = ['rebeccapurple', 'cornflowerblue', 'lightsalmon'];

const API_KEY = 'abcd-0123';

let root;

function getData(endpoint) {
  let url = buildURL(endpoint);
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      buildHTML(data, COLOURS[0]);
    })
    .catch((err) => {
      console.error(err);
    });
}

function init(btn, main) {
  addEventListeners(btn);
  root = main;
}

function addEventListeners(main) {
  main.addEventListener('click', (evt) => {
    evt.preventDefault();
    getData(`products`);
  });
}

function buildURL(endpoint) {
  return new URL(`${baseURL}${endpoint}?key=${API_KEY}`);
}

function buildHTML(data, clr) {
  let products = data.map((item) => {
    let { id, name, price, description, image } = { ...item };

    let prod = { id, name, price };
    return prod;
  });
  root.innerHTML = products.map((product) => {
    let { id, name, price } = { ...product };
    return `<div data-ref="${id}" style="background-color: ${clr}">
      <p>${name}</p>
      <p>${price}</p>
    </div>`;
  }).join('');
}

export default init;
