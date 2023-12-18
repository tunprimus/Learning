/* TodoMVC App Written in Vanilla JS in 2022
    https://github.com/1Marc/modern-todomvc-vanillajs */

export const getURLHash = () => document.location.hash.replace(/^#\//, "");

export const delegate = (elem, selector, event, handler) => {
    elem.addEventListener(event, (e) => {
        if (e.target.matches(selector)) {
            handler(e, elem);
        }
    });
};

export const insertHTML = (elem, html) => elem.insertAdjacentHTML("afterbegin", html);

export const replaceHTML = (elem, html) => {
    elem.replaceChildren();
    insertHTML(elem, html);
};
