/* Build a Single Page Application (SPA) Site With Vanilla.js

The one framework you don't have to install
https://blog.jeremylikness.com/blog/build-a-spa-site-with-vanillajs/ 
*/

import { registerDeck } from "./navigator.js";
import { registerControls } from "./controls.js";
import { registerKeyHandler } from "./keyhandler.js";

const app = async () => {
    registerDeck();
    registerControls();
    registerKeyHandler();
};

document.addEventListener("DOMContentLoaded", app);
