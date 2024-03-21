//@ts-check

class TrieNode {
	constructor() {
		
		// Each TrieNode has a map of child nodes, where the key is the character and the value is the child TrieNode
		this.children = new Map();

		
		// Flag to indicate if the current TrieNode represents the end of a word
		this.isEndOfWord = false;
	}
}

class Trie {
	constructor() {
	
		// The root of the Trie is an empty TrieNode
		this.root = new TrieNode();
	}

	/**
	 * Adds the word to trie
	 * @param {string} word 
	 */
	insert(word) {
		let current = this.root;

		for (let i = 0; i < word.length; i++) {
			const char = word[i];

			//  If the character does not exist as a child node, then create a new TrieNode for it
			if (!current.children.get(char)) {
				current.children.set(char, new TrieNode());
			}

			// Move to the next TrieNode
			current = current.children.get(char);
		}

		// Mark the end of the word by setting isEndOfWord to true
		current.isEndOfWord = true;
	}


	/**
	 * 
	 * @param {string} word 
	 * @returns {boolean}
	 */
	search(word) {
		let current = this.root;

		for (let i = 0; i < word.length; i++) {
			const char = word[i];

			// If the character does not exist as a child node, the word does not exist in the Trie
			if (!current.children.get(char)) {
				return false;
			}

			// Move to the next TrieNode
			current = current.children.get(char);
		}

		// Return true if the last TrieNode represents the end of a word
		return current.isEndOfWord;
	}


	/**
	 * 
	 * @param {string} prefix 
	 * @returns {boolean}
	 */
	startsWithPrefix(prefix) {
		let current = this.root;

		for (let i = 0; i < prefix.length; i++) {
			const char = prefix[i];

			// If the character does not exist as a child node, the word does not exist in the Trie
			if (!current.children.get(char)) {
				return false;
			}

			// Move to the next TrieNode
			current = current.children.get(char);
		}

		// The prefix exists in the Trie
		return true;
	}

	/**
	 * 
	 * @param {string} prefix 
	 * @returns {Array<string>}
	 */
	getAllWords(prefix = '') {
		const words = [];

		// Find the node corresponding to the given prefix
		const current = this._findNode(prefix);

		if (current) {
			// If the node exists, traverse the Trie starting from that node to find all words and add them to the 'words' array
			this._traverse(current, prefix, words);
		}

		return words;
	}

	/**
	 * 
	 * @param {string} word
	 */
	delete(word) {
		let current = this.root;

		const stack = [];
		let index = 0;

		// Find the last node of the word in the Trie
		while (index < word.length) {
			const char = word[index];

			if (!current.children.get(char)) {
				// Word does not exist in the Trie, nothing to delete
				return;
			}

			stack.push({ node: current, char });

			current = current.children.get(char);
			index++;
		}

		if (!current.isEndOfWord) {
			// Word does not exist in the Trie, nothing to delete
			return;
		}

		// Mark the last node as not representing the end of a word
		current.isEndOfWord = false;

		// Remove nodes in reverse order until reaching a node that has other children or is the end of another word
		while (stack.length > 0) {
			const { node, char } = stack.pop();

			if (current.children.size === 0 && !current.isEndOfWord) {
				node.children.delete(char);
				current = node;
			} else {
				break;
			}
		}
	}

	/**
	 * 
	 * @param {string} prefix 
	 * @returns {object}
	 */
	_findNode(prefix) {
		let current = this.root;
		for (let i = 0; i < prefix.length; i++) {
			const char = prefix[i];

			// If the character does not exist as a child node, the prefix does not exist in the Trie
			if (!current.children.get(char)) {
				return null;
			}

			// Move to the next TrieNode
			current = current.children.get(char);
		}

		// Return the node corresponding to the given prefix
		return current;
	}

	/**
	 * 
	 * @param {object} node 
	 * @param {string} prefix 
	 * @param {string} words 
	 */
	_traverse(node, prefix, words) {
		const stack = [];

		stack.push({ node, prefix });

		while (stack.length > 0) {
			const { node, prefix } = stack.pop();

			// If the current node represents the end of a word, add the word to the 'words' array
			if (node.isEndOfWord) {
				words.push(prefix);
			}

			// Push all child nodes to the stack to continue traversal
			for (const char of node.children.keys()) {
				const childNode = node.children.get(char);
				stack.push({ node: childNode, prefix: prefix + char });
			}
		}
	}
}

const trie = new Trie();

trie.insert('apple');
trie.insert('app');
trie.insert('monkey');
trie.insert('monk');
trie.insert('cat');
trie.insert('dog');
trie.insert('duck');
trie.insert('dune');

console.log(trie.search('apple'));
console.log(trie.search('app'));
console.log(trie.search('monk'));
console.log(trie.search('elephant'));

console.log(trie.getAllWords('ap'));
console.log(trie.getAllWords('b'));
console.log(trie.getAllWords('c'));
console.log(trie.getAllWords('m'));

trie.delete('monkey');

console.log(trie.getAllWords('m'));
