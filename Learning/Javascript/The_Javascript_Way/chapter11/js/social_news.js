/* Build a basic social media programme that shows users a list of links and allow adding of new ones.
- Link defined by title, URL and author
- All links must be prepended with "http://" or "https://"
- There must be a start menu at launch showing these actions:
    > Show the list of links
    > Add a new link
    > Remove existing link
    > Quit the programme
- The list of links displays the index ranking and the properties of each link in an alert window, or a message if link is absent
- When adding links, user is asked for the properties and the link is created and shown in the available links
- When removing links, user is asked for the correct index; it must not appear anymore in the available list. Link can not be removed from empty list.
- Start menu is shown after each action until user quits
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

        switch(option) {
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
                break;
            case "remove":
                if (links.length <= 0) {
                    alert("Please enter link author:");
                }
                console.log("remove");
                break;
            case "quit":
                console.log("Have a nice day, bye!");
                break;
            default:
                console.log("Unknown option");
                break;
        }
    }
    while (option != "quit");
}

displayStartMenu();

