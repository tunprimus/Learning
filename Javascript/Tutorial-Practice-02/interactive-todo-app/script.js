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

function renderTodoList() {
	todoList.innerHTML = '';

	todos.forEach((todo, index) => {
		const newTodoItem = document.createElement('li');
		newTodoItem.classList.add('li');
		newTodoItem.classList.add('card');
		newTodoItem.classList.add('todo-item');
		newTodoItem.setAttribute('draggable', 'true');
		newTodoItem.setAttribute('data-index', String(index));

		const todoContent = `
			<div class="todo">
				<input type="checkbox" name="checkbox" class="input checkbox" id="checkbox-${todo.id}" ${todo.isComplete ? "checked" : ""}>
				<label for="checkbox-${todo.id}" class="label input-label"></label>
				<p class="p todo-item__text">${todo.text}</p>
			</div>
			<div class="icons">
				<span class="emoji-entity-icon emoji-entity-icon__icon-pencil icon-pencil" aria-hidden="true">&#x270F;</span>
				<span class="emoji-entity-icon emoji-entity-icon__icon-times icon-times" aria-hidden="true">&#x2716;</span>
			</div>
		`;

		newTodoItem.innerHTML = todoContent;
		todoList.appendChild(newTodoItem);
	});

	addDraggableEventListeners();
}
