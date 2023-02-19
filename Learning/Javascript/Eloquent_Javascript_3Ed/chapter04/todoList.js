// Book example to manage a group of tasks

let todoList = [];
// Add tasks to end of the queue
function remember(task) {
    todoList.push(task);
}
// Gets and removes tasks from front of the queue
function getTask() {
    return todoList.shift();
}
// Adds tasks to the front of the queue (giving it priority)
function rememberUrgently(task) {
    todoList.unshift(task);
}
