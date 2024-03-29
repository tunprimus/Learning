
var form;
var savenote;
var pdb = new PouchDB('pouchnotes');

form = document.getElementById('addnote');

savenote = function(evt) {
	var obj = {};

	obj.notetitle = form.notetitle.value;
	obj.note = form.note.value;
	obj.tags = form.tags.value;

	// Generate an _id if there is none. It should be a string
	if (evt.target._id === '') {
		obj._id = new Date().getTime() + '';
	} else {
		obj._id = evt.target._id.value;
	}

	pdb.put(obj, function (err, response) {
		if (err) {
			console.error(err);
			return;
		} else if (response && response.ok) {}
	});
}

// Add the event handler
form.addEventListener('submit', savenote);
