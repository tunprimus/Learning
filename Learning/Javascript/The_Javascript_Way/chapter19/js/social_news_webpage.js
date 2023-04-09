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

class SocialNews {
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
        let socialNews = new SocialNews;
        for (let value of collection) {
            socialNews.add(value);
        }
        return socialNews;
    }

    [Symbol.iterator]() {
        return new SocialNewsIterator(this);
    }
}

// Iterable class
class SocialNewsIterator {
    constructor(socialNews) {
        this.socialNews = socialNews;
        this.position = 0;
    }

    next() {
        if (this.position >= this.socialNews.content.length) {
            return {done: true};
        } else {
            let result = {value: this.socialNews.content[this.position], done: false};
            this.position++;
            return result;
        }
    }
}

function defaultLinks() {
    const links = [];
    links.push(new SocialNews("JavaScript Classes", "https://www.toolsqa.com/javascript/javascript-classes/", "Arunkumar Chandra"));
    links.push(new SocialNews("WND", "https://www.wnd.com/", "Joseph Farah"));
    links.push(new SocialNews("Go Make Things", "gomakethings.com", "Chris Ferdinandi"));
    return links;
}
defaultLinks();

/* Function for display */
function displayStartMenu() {
    const links = defaultLinks();
    let option = "";
    do {
        console.log("Type one of the options below.");
        console.log("show -> Show the list of links \nadd -> Add a new link \nremove -> Remove an existing link \nquit -> Leave the programme");
        
        option = prompt("Enter your desired action:");

        switch (option) {
            case "show":
                if (links.length > 0) {
                    for (var i = 0; i < links.length; i++) {
                        alert(`${i + 1}: ${links[i].describe()}`);
                    }
                } else {
                    alert("No links to show!");
                }
                // console.log("show");
                break;
            case "add":
                const newLinkTitle = prompt("Enter link title:");
                const newLinkUrl = prompt("Enter link url:");
                const newLinkAuthor = prompt("Enter link author:");
                links.push(new SocialNews(newLinkTitle, newLinkUrl, newLinkAuthor));
                alert("Link added to list!");
                // console.log("add");
                // console.log(links);
                break;
            case "remove":
                if (links.length < 1) {
                    alert("Cannot remove from an empty list!");
                } else {
                    let index = -1;
                    const maxIndex = links.length;
                    do {
                        index = Number(prompt(`Enter index of link to remove (must be between 1 and ${maxIndex})`));
                    }
                    while (index < 1 || index > maxIndex);
                    links.splice(index - 1, 1);
                    alert("Link removed successfully!");
                }
                // console.log("remove");
                // console.log(links);
                break;
            case "quit":
                alert("Have a nice day, bye!");
                // console.log("Have a nice day, bye!");
                break;
            default:
                console.log("Unknown option");
                break;
        }
    }
    while (option != "quit");
}

displayStartMenu();

