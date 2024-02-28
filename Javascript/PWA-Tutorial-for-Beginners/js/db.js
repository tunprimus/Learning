const db = firebase.firestore();

/**
 * Offline data management
 */
db.enablePersistence()
	.catch(err => {
		if (err.code === 'failed precondition') {
			// Probably multiple tabs open at once
			console.error('persistence failed');
		} else if (err.code === 'unimplemented') {
			// Lack of browser support
			console.error('persistence is not available');
		}
	});

/**
 * Realtime listener
 */
db.collection('recipes').onSnapshot((snapshot) => {
	// console.log(snapshot.docChanges());
	snapshot.docChanges().forEach((change) => {
		// console.log(change, change.doc.data(), change.doc.id);
		if (change.type === 'added') {
			// Add the document data to the web page
			renderRecipe(change.doc.data(), change.doc.id);
		}

		if (change.type === 'removed') {
			// Remove the document data from the web page
			removeRecipe(change.doc.id);
		}
	})
});

const form = document.querySelector('#add-recipe');
form.addEventListener('submit', evt => {
	evt.preventDefault();
	
	const recipe = {
		title: form.title.value,
		ingredients: form.ingredients.value,
	};
	
	db.collection('recipes').add(recipe)
		.catch(err => console.error(err));
	
	form.title.value = '';
	form.ingredients.value = '';
});
