//@ts-check

let characterInfo = new Map();

// Set values
characterInfo.set('Link', '(555) 123-4567');
characterInfo.set('Zelda', '(555) 987-6543');
characterInfo.set('Mario', '(555) 555-1212');
characterInfo.set('Mega Man', '(555) 867-5309');
characterInfo.set('Ryu', '(555) 246-8135');
characterInfo.set('Corvo', '(555) 369-1472');

// Get values
console.log(characterInfo.get('Ryu'));
console.log(characterInfo.get('Batman'));

// Get size
console.log(characterInfo.size);

// Delete item
console.log(characterInfo.delete('Corvo'));
console.log(characterInfo.size);

// Delete all items
characterInfo.clear();
console.log(characterInfo.size);

function hash(key, arraySize) {
	let hashValue = 0;

	for (let i = 0; i < key.length; i++) {
		// Add the Unicode value of each character in the key
		hashValue += key.charCodeAt(i);
	}

	// Modulo operation to ensure the hash value fits within the array size
	return hashValue % arraySize;
}

let myArray = new Array(100);

let myHash = hash('Ryu', myArray.length);
console.log(myHash);
