/* Tabbed panels are widely used in user interfaces. They allow you to select an interface panel by choosing from a number of tabs “sticking out” above an element.
In this exercise you must implement a simple tabbed interface. Write a function, asTabs, that takes a DOM node and creates a tabbed interface showing the child elements of that node. It should insert a list of <button> elements at the top of the node, one for each child element, containing text retrieved from the data-tabname attribute of the child.
All but one of the original children should be hidden (given a display style of none). The currently visible node can be selected by clicking the buttons.
When that works, extend it to style the button for the currently selected tab differently so that it is obvious which tab is selected.
*/

// const tabPanelElement = document.querySelector("tab-panel");
const tabPanelElement = document.getElementsByTagName("tab-panel");
const divElement = document.querySelectorAll("div");
// console.log(tabPanelElement);

function tabsHandler(data1, data2) {
    // console.log(data1);
    const divContentElement = document.createElement("div");
    function tabsCreator() {
        const tabsArray = [];
        for (const item of data2) {
            const button = document.createElement("button");
            button.textContent = item.getAttribute("data-tabname");
            let tab = {item, button};
            // console.log(tab);
            tabsArray.push(tab);
        }
        // console.log(tabsArray);
        return tabsArray;
    }
    // tabsCreator();
    function tabsDisplay() {
        
        let index = 0;
        showTabs = tabsCreator();
        console.log(showTabs);
        showTabs.forEach(st => {
            index++;
            console.log(st);
            divContentElement.appendChild(st.button);
        });
        data1[0].insertBefore(divContentElement, data2[0]);
    }
    tabsDisplay();
}

tabsHandler(tabPanelElement, divElement);
