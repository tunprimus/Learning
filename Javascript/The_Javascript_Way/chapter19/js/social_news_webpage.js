/* Objective
This project builds upon the social news programme you created previously. This time, the objective is to make a social news web page.

Functional requirements
• A link is defined by its title, its URL and its author (submitter).
• If a new link URL does not start with "http://" or "https://", "http://" is automatically added at its beginning.
• The web page displays a list of at least three already existing links.
• A button exists for the user to submit a new link. When clicked, a form appears before the link list to input the new link properties (author, title and URL).
• In this form, all link fields are mandatory.
• When the new link is validated by the user, it is displayed at the top of the link list, replacing the form. A message indicates the success of the operation, then disappears after two seconds.

Technical requirements
• You should reuse any useful code from the previous project.
• All your code should be correctly indented.
• Names should be wisely chosen and adhere to the camelCase convention.
• Code duplication should be avoided.
*/

class SocialNewsLink {
    constructor(title, url, author) {
        this.value = [title, url, author];
        this.content = [...this.value];

        let absoluteUrl = url;

        if (!absoluteUrl.startsWith("http://") && !absoluteUrl.startsWith("https://")) {
            absoluteUrl = "http://" + absoluteUrl;
        }

        this.title = title;
        this.url = absoluteUrl;
        this.author = author;

    }

    // Describe the link as a string.
    describe() {
        return `${this.title} at ${this.url} by author: ${this.author}`;
    }

    getTitle() {
        return this.value[0];
    }

    getUrl() {
        return this.value[1];
    }

    getAuthor() {
        return this.value[2];
    }

    has(value) {
        return this.content.includes(value);
    }

    add(value) {
        if (!this.has(value)) {
            this.content.push(value);
        }
    }

    delete(value) {
        if (this.has(value)) {
            this.content = this.content.filter(item => item !== value);
        }
    }

    static from(collection) {
        let socialNewsLink = new SocialNewsLink;
        for (let value of collection) {
            socialNewsLink.add(value);
        }
        return socialNewsLink;
    }

    [Symbol.iterator]() {
        return new SocialNewsLinkIterator(this);
    }
}

// Iterable class
class SocialNewsLinkIterator {
    constructor(socialNewsLink) {
        this.socialNewsLink = socialNewsLink;
        this.position = 0;
    }

    next() {
        if (this.position >= this.socialNewsLink.content.length) {
            return {done: true};
        } else {
            let result = {value: this.socialNewsLink.content[this.position], done: false};
            this.position++;
            return result;
        }
    }
}

function defaultLinks() {
    const links = [];
    links.push(new SocialNewsLink("Foundation for Economic Education", "https://fee.org/", "Jonathan Miltimore"));
    links.push(new SocialNewsLink("WND", "https://www.wnd.com/", "Joseph Farah"));
    links.push(new SocialNewsLink("Go Make Things", "gomakethings.com", "Chris Ferdinandi"));
    return links;
}
defaultLinks();

const contentElement = document.getElementById("content");
// const divElement = document.createElement("div");
const submitButtonElement = document.getElementById("submitButton");
/* 
divElement.classList.add("link");
contentElement.appendChild(divElement);
 */

const linkMoverArray = [];
let linkMoverObj = {};
let toMergeArray = [];
let mergedObj = {};

let mergedList = [];

/* Function for display */
function displayHandler() {
    const baseLinks = defaultLinks();
    // console.log(links);
    
    submitButtonElement.addEventListener("click", () => {
        const fragment = new DocumentFragment();

        // Create and style form element
        const formElement = document.createElement("form");
        formElement.classList.add("form");

        // Create and style title input element
        const titleInputElement = document.createElement("input");
        titleInputElement.classList.add("linkTitle");
        titleInputElement.id = "title";
        titleInputElement.placeholder = "Title";
        titleInputElement.required = true;
        // console.log(titleInputElement);

        // Create and style URL input element
        const urlInputElement = document.createElement("input");
        urlInputElement.classList.add("linkUrl");
        urlInputElement.placeholder = "URL";
        urlInputElement.required = true;

        // Create and style author input element
        const authorInputElement = document.createElement("input");
        authorInputElement.classList.add("linkAuthor");
        authorInputElement.placeholder = "Author";
        authorInputElement.required = true;

        // Create and style add button element
        const addButtonElement = document.createElement("button");
        addButtonElement.innerHTML = "Add link";
        addButtonElement.classList.add("button", "btn-default", "navbar-btn");
        addButtonElement.id = "addButton";
        // console.log(addButtonElement);


        // Add to the DOM
        formElement.appendChild(titleInputElement);
        formElement.appendChild(urlInputElement);
        formElement.appendChild(authorInputElement);
        formElement.appendChild(addButtonElement);
        fragment.appendChild(formElement);
        contentElement.prepend(fragment);
        
        formElement.addEventListener("submit", event => {
            // console.log(event.target.children);
            const holder = event.target.children;
            for (let i = 0; i < holder.length - 1; i++) {
                console.log(holder[i].value);
                linkMoverArray.push(holder[i].value);
            }
            // event.preventDefault();
            // console.log(linkMoverArray);
            [linkMoverObj.title, linkMoverObj.url, linkMoverObj.author] = linkMoverArray;
            // console.log(linkMoverObj);
            toMergeArray.push(linkMoverObj);
            // console.log(toMergeArray);
            const merger = [...toMergeArray, ...baseLinks];
            console.log(merger);
        });
    });
    
    baseLinks.forEach(item => {
        // Create div element for each groups of links
        const divElement = document.createElement("div");
        divElement.classList.add("link");
        // Prepare link title elements
        const linkElement = document.createElement("a");
        linkElement.href = item.url;
        linkElement.classList.add("linkTitle");
        linkElement.appendChild(document.createTextNode(item.title));
        // console.log(linkElement);
        divElement.appendChild(linkElement);
        // Prepare link URL elements
        const urlElement = document.createElement("span");
        urlElement.appendChild(document.createTextNode(item.url));
        urlElement.classList.add("linkUrl");
        divElement.appendChild(urlElement);
        // Prepare author element
        const authorElement = document.createElement("span");
        authorElement.appendChild(document.createTextNode(` Submitted by ${item.author}`));
        authorElement.classList.add("linkAuthor");
        divElement.appendChild(authorElement);
        contentElement.appendChild(divElement);
    });
    // contentElement.appendChild(divElement);


}

displayHandler();

