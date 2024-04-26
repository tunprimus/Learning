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
	if (inputField.value.trim() !== '') {
		const todoText = inputField.value;
		inputField.value = '';

		const todoItemId = Math.floor(Math.random() * 10000);

		const newTodoItem = {
			id: todoItemId,
			text: todoText,
			isComplete: false,
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

let dragStartIndex;

function addDraggableEventListeners() {
	const todoItems = document.querySelectorAll('.todo-item');

	todoItems.forEach((item, index) => {
		item.addEventListener('dragstart', () => item.classList.add('dragging'));

		item.addEventListener('dragend', () => {
			item.classList.remove('dragging');
			updateTodosOrder();
		});
	});

	todoList.addEventListener('dragover', (evt) => {
		evt.preventDefault();
		const draggingItem = document.querySelector('.dragging');
		// Get array of all items except the one being dragged
		let siblings = [...todoList.querySelectorAll('.todo-item:not(.dragging)')];

		// Find next sibling item after which the dragging item should be placed
		let nextSibling = siblings.find(sibling => {
			return evt.clientY <= sibling.offsetTop + (sibling.offsetHeight / 2);
		});

		// Inserting the dragging item before the found sibling
		todoList.insertBefore(draggingItem, nextSibling);
	});

	todoList.addEventListener('dragenter', evt => evt.preventDefault());
}

function updateTodosOrder() {
	const updatedTodos = [];
	const todoItems = document.querySelectorAll('.todo-item');

	todoItems.forEach((item) => {
		const index = parseInt(item.getAttribute('data-index'));
		updatedTodos.push(todos[index]);
	});

	todos = updatedTodos;
	localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleTodoCompletion(todoId) {
	todos = todos.map((todo) => {
		if (todo.id === todoId) {
			todo.isComplete = !todo.isComplete;
		}
		return todo;
	});
	localStorage.setItem('todos', JSON.stringify(todos));
	renderTodoList();
	updateItemsLeft();
}

todoList.addEventListener('change', (evt) => {
	const checkbox = evt.target;
	const todoId = parseInt(checkbox.id.split('-')[1]);
	/**
	 * eg todo-item id="checkbox-10".
	 * checkbox-2048.split("-") = ["checkbox", "10"]
	 * [1] = "10"
	 * parseInt("10") = 10
	 */
	toggleTodoCompletion(todoId);
});

function editTodo(todoId, updatedTodoText) {
	todos = todos.map((todo) => {
		if (todo.id === todoId) {
			console.log(todo);
			return {
				id: todo.id,
				text: updatedTodoText,
				isComplete: todo.isComplete,
			};
		}
		return todo;
	});
	localStorage.setItem('todos', JSON.stringify(todos));
	renderTodoList();
}

todoList.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('emoji-entity-icon__icon-pencil')) {
		const icon = evt.target;
		const todoItem = icon.closest('.todo-item');
		const todoId = parseInt(todoItem.querySelector('input[type="checkbox"]').id.split('-')[1]);
		const todoText = todoItem.querySelector('p').textContent;
		const newText = prompt('Edit the Todo item', todoText);

		if (newText !== null && newText !== '') {
			editTodo(todoId, newText);
		}
	}
});

function deleteTodo(todoId) {
	todos = todos.filter((todo) => todo.id !== todoId);
	localStorage.setItem('todos', JSON.stringify(todos));
	renderTodoList();
	updateItemsLeft();
}

todoList.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('emoji-entity-icon__icon-times')) {
		const icon = evt.target;
		const todoItem = icon.closest('.todo-item');
		const todoId = parseInt(todoItem.querySelector('input[type="checkbox"]').id.split('-')[1]);
		deleteTodo(todoId);
	}
});

function updateItemsLeft() {
	const incompleteItems = todos.filter((todo) => !todo.isComplete);
	itemsLeftElement.textContent = incompleteItems.length;
}

function filterTodoList(filterType) {
	let filteredTodos = [];

	switch (filterType) {
		case 'all':
			filteredTodos = todos;
			break;
		case 'active':
			filteredTodos = todos.filter(function (todo) {
				return !todo.isComplete;
			});
			break;
		case 'completed':
			filteredTodos = todos.filter(function (todo) {
				return todo.isComplete;
			});
			break;
		default:
			return;
			break;
	}
	renderFilteredTodoList(filteredTodos);
}

function renderFilteredTodoList(filteredTodos) {
	todoList.innerHTML = '';

	filteredTodos.forEach((todo, index) => {
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

allBtn.addEventListener('click', () => {
	allBtn.classList.add('active');
	mAllBtn.classList.add('active');
	activeBtn.classList.remove('active');
	mActiveBtn.classList.remove('active');
	completedBtn.classList.remove('active');
	mCompletedBtn.classList.remove('active');
	filterTodoList('all');
});

mAllBtn.addEventListener('click', () => {
	allBtn.classList.add('active');
	mAllBtn.classList.add('active');
	activeBtn.classList.remove('active');
	mActiveBtn.classList.remove('active');
	completedBtn.classList.remove('active');
	mCompletedBtn.classList.remove('active');
	filterTodoList('all');
});

activeBtn.addEventListener('click', () => {
	activeBtn.classList.add('active');
	mActiveBtn.classList.add('active');
	allBtn.classList.remove('active');
	mAllBtn.classList.remove('active');
	completedBtn.classList.remove('active');
	mCompletedBtn.classList.remove('active');
	filterTodoList('active');
});

mActiveBtn.addEventListener('click', () => {
	activeBtn.classList.add('active');
	mActiveBtn.classList.add('active');
	allBtn.classList.remove('active');
	mAllBtn.classList.remove('active');
	completedBtn.classList.remove('active');
	mCompletedBtn.classList.remove('active');
	filterTodoList('active');
});

completedBtn.addEventListener('click', () => {
	completedBtn.classList.add('active');
	mCompletedBtn.classList.add('active');
	activeBtn.classList.remove('active');
	mActiveBtn.classList.remove('active');
	allBtn.classList.remove('active');
	mAllBtn.classList.remove('active');
	filterTodoList('completed');
});

mCompletedBtn.addEventListener('click', () => {
	completedBtn.classList.add('active');
	mCompletedBtn.classList.add('active');
	activeBtn.classList.remove('active');
	mActiveBtn.classList.remove('active');
	allBtn.classList.remove('active');
	mAllBtn.classList.remove('active');
	filterTodoList('completed');
});

function clearCompletedTodos() {
	todos = todos.filter((todo) => !todo.isComplete);

	localStorage.setItem('todos', JSON.stringify(todos));
	renderTodoList();
	updateItemsLeft();
}

clearBtn.addEventListener('click', () => {
	clearCompletedTodos();
});
