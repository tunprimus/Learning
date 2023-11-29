import './style.css';
import { colours } from "./data/colour-data.js";

const createColourPallet = () => {
  colours.forEach((colour) => {
    const colourPallet = document.createElement('div');
    colourPallet.classList.add('colour-pallet');
    colourPallet.style.backgroundColor = colour.data;
    const colourName = document.createElement('div');
    colourName.classList.add('colour-name');
    colourName.textContent = colour.data;
    colourPallet.appendChild(colourName);
    colourPallet.addEventListener('click', () => {
      const colourCode = colour.data;
      console.log(colourCode);
      copyContent(colourCode);
    });
    document.querySelector('#app').appendChild(colourPallet);
  });
};

const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
    alert(`The colour ${text} has been copied successfully`);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

createColourPallet();
