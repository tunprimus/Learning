/* Creating Drag and Drop Elements with Pure, Vanilla JavaScript https://www.cloudsigma.com/creating-drag-and-drop-elements-with-pure-vanilla-javascript/ */

const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

/* Set up all the event listeners to add and remove the class list
 */

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    });
});

// EventListener for hovering and moving elements around
containers.forEach(container => {
    container.addEventListener("dragover", event => {
        // This is to enable dropping inside an element
        event.preventDefault();
        //
        const afterElement = getDragAfterElement(container, event.clientY);
        const draggable = container.querySelector(".dragging");
        if (afterElement === null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
});

// To determine mouse position
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element;
}
