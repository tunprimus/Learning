/* Vanilla.js — Getting Started
Build web code with a zero-footprint web framework
https://blog.jeremylikness.com/blog/2019-04-09_vanilla.jsgetting-started/
*/

// Wrapper class that dynamically generate HTML elements
class Wrapper {
    // Generates an element and populates it with text; while conditionally setting it to invisible or visible and wires up a toggle to make it easy to hide/show the element
    constructor(element, text, display = true) {
        this.element = document.createElement(element);
        this.element.innerHTML = text;
        this.display = !display;
        this.toggleDisplay();
    }
    // Wrapper to add a “click” listener and call a method
    click(val) {
        this.element.addEventListener("click", () => val());
        return this;
    }
    // Sets the style so the cursor turns into a hand indicating an action can be performed
    showSelectable() {
        this.element.style.cursor = "pointer";
        return this;
    }
    addClass(className) {
        this.element.classList.add(className);
        return this;
    }
    toggleDisplay() {
        this.display = !this.display;
        this.element.style.display = this.display ? "" : "none";
        return this;
    }
    // Nests an element inside the parent
    appendChild(child) {
        this.element.appendChild(child.element);
        return this;
    }
    // Quick way to create and append a child
    createChild(element, text, display = true) {
        let wrapper = new Wrapper(element, text, display);
        this.appendChild(wrapper);
        return this;
    }
    // Generates a new instance so one does not have to call new all the time
    static generate(element, text, display = true) {
        return new Wrapper(element, text, display);
    }
    /* The Wrapper returning this makes it possible to chain function calls for a more fluent API */
}

// Generate anchor tags
class AnchorWrapper extends Wrapper {
    constructor(href, text, target = "_blank") {
        super("a", text);
        this.element.href = href;
        this.element.target = target;
    }
    static generate(href, text, target = "_blank") {
        return new AnchorWrapper(href, text, target);
    }
}

// Rendering function
const renderPost = (post, user) => {
    const bodyDiv = Wrapper.generate("div", "", false)
        .createChild("p", post.body)
        .appendChild(Wrapper.generate("p", user.name).addClass("tooltip")
            .appendChild(Wrapper.generate("span", `${user.name} `)
                .appendChild(AnchorWrapper.generate(`mailto:${user.email}`, user.email))
                .createChild("br", "")
                .appendChild(AnchorWrapper.generate(`https://maps.google.com?q=${user.address.geo.lat}, ${user.address.geo.lng}`, "🌎 Locate"))
                .addClass("tooltiptext")));

    return Wrapper.generate("div", "")
        .addClass("post")
        .appendChild(Wrapper.generate("h1", `${user.username} &mdash; ${post.title}`)
            .showSelectable()
            .click(() => bodyDiv.toggleDisplay()))
        .appendChild(bodyDiv)
        .element;
};

const url = "https://jsonplaceholder.typicode.com";

// JSON fetcher
const get = (model, domain, done) => {
    // fetch(`https://jsonplaceholder.typicode.com/${domain}`)
    fetch(url + "/" +`${domain}`)
        .then(response => response.json())
        .then(json => {
            model[domain] = json;
            done();
        });
};


const app = document.getElementById("app");

// Grab posts, then users, then maps the users by id on userIdx to make them easier to reference
const run = (model) => get(model, "users", () => 
    get(model, "posts", () => {
        model.users.forEach(user => model.userIdx[user.id] = user);
        app.innerText = "";
        model.posts.forEach(post => app.appendChild(renderPost(post, model.userIdx[post.userId])));
    }));

app.appendChild(Wrapper.generate("button", "Load").click(() => run({
    userIdx: {},
})).element);
