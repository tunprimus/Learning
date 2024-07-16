//@ts-check

class Store {
	constructor(name, remote, onChange) {
		this.db = new PouchDB(name);

		// Start sync in pull mode
		PouchDB.sync(name, `${remote}/${name}`, {
			live: true,
			retry: true,
		}).on('change', (info) => {
			onChange(info);
		});
	}

	getAll() {
		// Get all items from storage including details
		return this.db.allDocs({ include_docs: true })
			.then((db) => {
				// Remap rows to collection of items
				return db.rows.map(row => row.doc);
			});
	}

	get(id) {
		return this.db.get(id);
	}

	save(item) {
		// Add or update an item depending on _id
		return item._id ? this.update(item) : this.add(item);
	}

	add(item) {
		return this.db.post(item);
	}

	update(item) {
		// Find by id
		return this.db.get(item._id)
			.then((updatingItem) => {
				// Update item
				Object.assign(updatingItem, item);
				return this.db.put(updatingItem);
			});
	}

	remove(id) {
		// Find item by id
		return this.db.get(id)
			.then((item) => {
				// Remove item
				return this.db.remove(item);
			});
	}
}

window.Store = Store;
