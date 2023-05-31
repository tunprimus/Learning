/* TodoMVC App Written in Vanilla JS in 2022
    https://github.com/1Marc/modern-todomvc-vanillajs */

import { delegate, getURLHash, insertHTML, replaceHTML } from "./helpers.js";
import { TodoStore } from "./store.js";

const Todos = new TodoStore("todo-modern-vanillajs");

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
            document.querySelectorAll(`[data-todo="filters"] a`).forEach((elem) => {
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
    init() {
        Todos.addEventListener("save", App.render);
        App.filter = getURLHash();
        window.addEventListener("hashchange", () => {
            App.filter = getURLHash();
            App.render();
        });
        App.$.input.addEventListener("keyup", (ev) => {
            if (ev.key === "Enter" && ev.target.value.length) {
                Todos.add({
                    title: ev.target.value,
                    completed: false,
                    id: "id_" + Date.now(),
                });
                App.$.input.value = "";
            }
        });
        App.$.toggleAll.addEventListener("click", (ev) => {
            Todos.toggleAll();
        });
        App.$.clear.addEventListener("click", (ev) => {
            Todos.clearCompleted();
        });
        App.bindTodoEvents();
        App.render();
    },
    todoEvent(event, selector, handler) {
        delegate(App.$.list, selector, event, (ev) => {
            let $elem = ev.target.closest("[data-id]");
            handler(Todos.get($elem.dataset.id), $elem, ev);
        });
    },
    bindTodoEvents() {
        App.todoEvent("click", '[data-todo="destroy"]', (todo) => Todos.remove(todo));
        App.todoEvent("click", '[data-todo="toggle"]', (todo) => Todos.toggle(todo));
        App.todoEvent("dblclick", '[data-todo="label"]', (_, $li) => {
            $li.classList.add("editing");
            $li.querySelector('[data-todo="edit"]').focus();
        });
        App.todoEvent("keyup", '[data-todo="edit"]', (todo, $li, ev) => {
            let $input = $li.querySelector('[data-todo="edit"]');
            if (ev.key === "Enter" && $input.value) {
                $li.classList.remove("editing");
                Todos.update({ ...todo, title: $input.value });
            }
            if (ev.key === "Escape") {
                document.activeElement.blur();
            }
        });
        App.todoEvent("focusout", '[data-todo="edit"]', (todo, $li, ev) => {
            if ($li.classList.contains("editing")) {
                App.render();
            }
        });
    },
    createTodoItem(todo) {
        const li = document.createElement("li");
        li.dataset.id = todo.id;
        if (todo.completed) {
            li.classList.add("completed");
        }
        insertHTML(
            li,
            `<div class="view">
                <input data-todo="toggle" class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
                <label data-todo="label"></label>
                <button class="destroy" data-todo="destroy"></button>
            </div>
            <input class="edit" data-todo="edit">`
        );
        li.querySelector('[data-todo="label"]').textContent = todo.title;
        li.querySelector('[data-todo="edit"]').value = todo.title;
        return li;
    },
    render() {
        const count = Todos.all().length;
        App.$.setActiveFilter(App.filter);
        App.$.list.replaceChildren(...Todos.all(App.filter).map((todo) => App.createTodoItem(todo)));
        App.$.showMain(count);
        App.$.showFooter(count);
        App.$.showClear(Todos.hasCompleted());
        App.$.toggleAll.checked = Todos.isAllCompleted();
        App.$.displayCount(Todos.all("active").length);
    },
};
