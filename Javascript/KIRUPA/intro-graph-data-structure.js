//@ts-check

class Graph {
	constructor() {
		// Map to store nodes and their adjacent nodes
		this.nodes = new Map();

		// Flag to indicate if the graph is directed or undirected
		this.isDirected = false;
	}

	/**
	 * Add a new node to the graph
	 * @param {object} node 
	 */
	addNode(node) {
		if (!this.nodes.has(node)) {
			this.nodes.set(node, new Set());
		}
	}

	/**
	 * Add an edge between two nodes
	 * @param {object} node1 
	 * @param {object} node2 
	 */
	addEdge(node1, node2) {
		// Check if the node exists
		if (!this.nodes.has(node1) || !this.nodes.has(node2)) {
			throw new Error('Nodes do not exist in the graph');
		}

		// Add an edge between the two nodes
		this.nodes.get(node1).add(node2);

		// If the graph is undirected, add edge in the opposite direction as well
		if (!this.isDirected) {
			this.nodes.get(node2).add(node1);
		}
	}

	/**
	 * Remove a node and all its incident edges from the graph
	 * @param {object} node 
	 */
	removeNode(node) {
		if (this.nodes.has(node)) {
			// Remove the node and its edges from the graph
			this.nodes.delete(node);

			// Remove any incident edges in other nodes
			for (const [node, adjacentNodes] of this.nodes) {
				adjacentNodes.delete(node);
			}
		}
	}

	/**
	 * Remove an edge between two nodes
	 * @param {object} node1 
	 * @param {object} node2 
	 */
	removeEdge(node1, node2) {
		if (this.nodes.has(node1) && this.nodes.has(node2)) {
			// Remove edge between node1 and node2
			this.nodes.get(node1).delete(node2);

			// If the graph is undirected, remove edge in the opposite direction also
			if (!this.isDirected) {
				this.nodes.get(node2).delete(node1);
			}
		}
	}

	/**
	 * Check if an edge exists between two nodes
	 * @param {object} node1 
	 * @param {object} node2 
	 * @returns 
	 */
	hasEdge(node1, node2) {
		if (this.nodes.has(node1) && this.nodes.has(node2)) {
			return this.nodes.get(node1).has(node2);
		}
		return false;
	}

	/**
	 * Get the adjacent nodes of a given node
	 * @param {object} node 
	 * @returns {object[]}
	 */
	getNeighbours(node) {
		if (this.nodes.has(node)) {
			return Array.from(this.nodes.keys());
		}
		return [];
	}

	/**
	 * Get all nodes in the graph
	 * @returns {object[]}
	 */
	getAllNodes() {
		return Array.from(this.nodes.keys());
	}

	/**
	 * Set the graph as directed
	 */
	setDirected() {
		this.isDirected = true;
	}

	/**
	 * Set the graph as undirected
	 */
	setUndirected() {
		this.isDirected = false;
	}

	/**
	 * Check if the graph is directed
	 * @returns {boolean}
	 */
	isGraphDirected() {
		return this.isDirected;
	}
}

// Create a new graph
const characters = new Graph();
characters.setDirected();

// Add nodes
characters.addNode('Jerry');
characters.addNode('Elaine');
characters.addNode('Kramer');
characters.addNode('George');
characters.addNode('Newman');

// Add edges
characters.addEdge('Jerry', 'Elaine');
characters.addEdge('Jerry', 'George');
characters.addEdge('Jerry', 'Kramer');
characters.addEdge('Elaine', 'Jerry');
characters.addEdge('Elaine', 'George');
characters.addEdge('Elaine', 'Kramer');
characters.addEdge('George', 'Elaine');
characters.addEdge('George', 'Jerry');
characters.addEdge('George', 'Kramer');
characters.addEdge('Kramer', 'Elaine');
characters.addEdge('Kramer', 'George');
characters.addEdge('Kramer', 'Jerry');
characters.addEdge('Kramer', 'Newman');
characters.addEdge('Newman', 'Kramer');
characters.addEdge('Newman', 'Jerry');

// Get the adjacent nodes of a node
console.log("Jerry's neighbours: ");
console.log(characters.getNeighbours('Jerry'));

console.log("Newman's neighbours: ");
console.log(characters.getNeighbours('Newman'));

// Check if an edge exists between two nodes
console.log("Does edge exist between Jerry to Newman? ");
console.log(characters.hasEdge('Jerry', 'Newman'));

console.log("Does edge exist between Newman to Jerry? ");
console.log(characters.hasEdge('Newman', 'Jerry'));

console.log("Does edge exist between Elaine to George? ");
console.log(characters.hasEdge('Elaine', 'George'));

// Get all nodes in the graph
console.log('All the nodes: ');
console.log(characters.getAllNodes());

// Remove a node
console.log('Remove the node, Newman: ');
characters.removeNode('Newman');
console.log(characters.getAllNodes());

console.log("Does edge exist between Kramer to Newman? ");
console.log(characters.hasEdge('Kramer', 'Newman'));
