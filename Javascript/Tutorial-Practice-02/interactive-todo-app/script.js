//@ts-check

const inputField = document.querySelector('#todo-input');
const todoList = document.querySelector('#todos');
const addBtn = document.querySelector('#add-btn');
const itemsLeftElement = document.querySelector('#items-left');
const allBtn = document.querySelector('#all');
const activeBtn = document.querySelector('#active');
const completedBtn = document.querySelector('#completed');
const clearBtn = document.querySelector('#clear');

// For mobile buttons
const mAllBtn = document.querySelector('#m-all');
const mActiveBtn = document.querySelector('#m-active');
const mCompletedBtn = document.querySelector('#m-completed');

let todos = [];
// Check if todos exist in the local storage
if (localStorage.getItem('todos')) {
	todos = JSON.parse(localStorage.getItem('todos'));
	renderTodoList();
}

function addTodoItem() {
	if (inputField.value.trim() === '') {
		const todoText = inputField.value;
		inputField.value = '';

		const todoItemId = Math.floor(Math.random() * 10000);

		const newTodoItem = {
			id: todoItemId,
			text: todoText,
			isCompleted: false,
		};

		todos.push(newTodoItem);
		localStorage.setItem('todos', JSON.stringify(todos));

		renderTodoList();
		updateItemsLeft();
	}
}

inputField.addEventListener('keydown', (evt) => {
	if (evt.key === 'Enter' && inputField.value.trim() !== '') {
		addTodoItem();
	}
});

addBtn.addEventListener('click', () => {
	addTodoItem();
});
