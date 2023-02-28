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
    while (option != "quit");
}


