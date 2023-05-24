/*
Write a JavaScript programme containing a linkInfo() function that shows:
- The total number of links.
- The target of the first and last links.
This function should work even if no links are present.
*/

function linkInfo() {
    // Traverse the whole DOM
    // const linkElements = document.getElementsByTagName("a");
    const linkElements = document.querySelectorAll("a");
    // Check if there are links; otherwise display no link message
    if (linkElements.length < 0) {
        return "No link present";
    } else {
        // If there are links, display the number
        console.log(linkElements.length);
    }
    // If links are more than one, display target of first and last
    const linkElementsArray = Array.from(linkElements);
    if (linkElementsArray.length >= 1) {
        console.log(linkElementsArray[0]);
        console.log(linkElementsArray[linkElements.length - 1]);
    }
};

linkInfo();


/*
Add the following new instrument at the end of the HTML list, then check your programme’s new result.
<li id="harpsichord">The <a href="https://en.wikipedia.org/wiki/Harpsichord">harpsichord</a></li>
*/