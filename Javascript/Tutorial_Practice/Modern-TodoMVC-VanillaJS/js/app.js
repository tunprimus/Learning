/* TodoMVC App Written in Vanilla JS in 2022
    https://github.com/1Marc/modern-todomvc-vanillajs */

import { delegate, getURLHash, insertHTML, replaceHTML } from "./helpers.js";
import { TodoStore } from "./store.js";

const Todos = new TodosStore("todo-modern-vanillajs");

const App = {
    $: {
        input: document.querySelector('[data-todo="new"]'),
        toggleAll: document.querySelector('[data-toggle="toggle-all"]'),
        clear: document.querySelector('[data-todo="clear-completed"]'),
        list: document.querySelector('[data-todo="list"]'),
        showMain(show) {
            document.querySelector('[data-todo="main"]').style.display = show ? "block" : "none";
        },
        showFooter(show) {
            document.querySelector('[data-todo="footer"]').style.display = show ? "block" : "none";
        },
        showClear(show) {
            App.$.clear.style.display = show ? "block" : "none";
        },
        setActiveFilter(filter) {
            document.querySelectorAll(`[data-todo="filters"] a`).forEach((element) => {
                if (elem.matches(`[href="#/${filter}"]`)) {
                    elem.classList.add("selected");
                } else {
                    elem.classList.remove("selected");
                }
            });
        },
        displayCount(count) {
            replaceHTML(
                document.querySelector('[data-todo="count"]'),
                `<strong>${count}</strong> ${count === 1 ? "item" : "items"} left`
            );
        },
    },
    init() {},
    todoEvent() {},
    bindTodoEvents() {},
    createTodoItem() {},
    render() {},
};
