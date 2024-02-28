//@ts-check

const recipes = document.querySelector('#recipes');

document.addEventListener('DOMContentLoaded', function() {
	// Nav menu
	const menus = document.querySelectorAll('.side-menu');
	M.Sidenav.init(menus, {edge: 'right'});
	// Add recipe form
	const forms = document.querySelectorAll('.side-form');
	M.Sidenav.init(forms, {edge: 'left'});
});

/**
 * 
 * @param {object} data 
 * @param {string} id 
 */
const renderRecipe = (data, id) => {
	const html = `
	<div class="card-panel recipe card-panel__recipe white row" data-id="${id}">
		<img src="./img/dish.png" alt="recipe thumb" class="recipe__image">
		<div class="recipe-details">
			<div class="recipe-title">${data.title}</div>
			<div class="recipe-ingredients">${data.ingredients}</div>
		</div>
		<div class="recipe-delete">
			<span class="recipe__delete" data-id="${id}">&#x1F5D1;</span>
			<i class="material-icons"></i>
		</div>
	</div>
	`;

	recipes.innerHTML += html;
};


const removeRecipe = (id) => {
	const recipe = document.querySelector(`.recipe[data-id="${id}"]`);
	recipe.remove();
}
