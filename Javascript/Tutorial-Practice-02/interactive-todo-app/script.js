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
