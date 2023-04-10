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

/* Function for display */
function displayHandler() {
    const links = defaultLinks();
    // console.log(links);
    const fragment = new DocumentFragment();
    const formElement = document.createElement("form");
    const titleInputElement = document.createElement("input");
    const urlInputElement = document.createElement("input");
    const authorInputElement = document.createElement("input");
    const addButtonElement = document.createElement("button");
    formElement.appendChild(titleInputElement);
    formElement.appendChild(urlInputElement);
    formElement.appendChild(authorInputElement);
    formElement.appendChild(addButtonElement);
    fragment.appendChild(formElement);
    contentElement.appendChild(fragment);
}

displayHandler();

