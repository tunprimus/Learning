/* TodoMVC App Written in Vanilla JS in 2022
    https://github.com/1Marc/modern-todomvc-vanillajs */

export const TodoStore = class extends EventTarget {
    constructor(localStorageKey) {
        super();
        this.localStorageKey = localStorageKey;
        this.readStorage();
        // handle todos edited in another window
        window.addEventListener("storage", () => {
            this._readStorage();
            this._save();
        }, false);
        // GETTER methods
        this.get = (id) => this.todos.find((todo) => todo.id === id);
        this.isAllCompleted = () => this.todos.every((todo) => todo.completed);
        this.hasCompleted = () => this.todos.some((todo) => todo.completed);
    }
};
