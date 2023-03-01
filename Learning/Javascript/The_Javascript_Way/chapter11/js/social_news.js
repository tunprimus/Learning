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


/* Function for display */
function displayStartMenu() {
    let option = "";
    do {
        console.log("Type one of the options below.");
        console.log("show -> Show the list of links");
        console.log("add -> Add a new link");
        console.log("remove -> Remove an existing link");
        console.log("quit -> Leave the programme");
        option = prompt("Enter your desired action:");

        switch(option) {
            case "show":
                console.log("show");
                break;
            case "add":
                console.log("add");
                break;
            case "remove":
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

