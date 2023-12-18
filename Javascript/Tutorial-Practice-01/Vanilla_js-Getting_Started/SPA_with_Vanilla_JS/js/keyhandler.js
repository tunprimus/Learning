


import { Navigator } from "./navigator.js";

/**
 * Custom element to handle key press
 * @extends {HTMLElement}
 */
export class KeyHandler extends HTMLElement {
    /**
     * Create a key handler instance
     */
    constructor() {
        super();
        /**
         * The related Navigator instance (deck) to handle key press events for
         * @type {Navigator}
         */
        this._deck = null;
    }

    /**
     * Gets the attributes being watched
     * @returns {string[]} The attributes to watch
     */
    static get observedAttributes() {
        return ["deck"];
    }

    /**
     * Called when attributes change
     * @param {string} attrName The attribute that changed
     * @param {string} oldVal The old value
     * @param {string} newVal The new value
     */
    async attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "deck") {
            if (oldVal !== newVal) {
                /** @type {Navigator} */
                this._deck = (document.getElementById(newVal));
                this._deck.parentElement.addEventListener("keydown", key => {
                    if (key.keyCode == 39 || key.keyCode == 32) {
                        this._deck.next();
                    } else if(key.keyCode == 37) {
                        this._deck.previous();
                    }
                });
            }
        }
    }
}

/**
 * Registers the custom key-handler element
 */
export const registerKeyHandler = () => customElements.define("key-handler", KeyHandler);
