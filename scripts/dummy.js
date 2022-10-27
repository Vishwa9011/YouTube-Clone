// ! class Linked list
class LinkedList {
	constructor(head) {
		this.head = head || null;
		this.size = 0;
	}
}

//? Node for the linked list
class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

//! creating a  new ll
let ll = new LinkedList();
console.log(ll.head);

function insert(head, data) {
	// if head is null
	let node = new Node(data);
	if (head === null) {
		head = node;
		return head;
	}
	let curr = head;
	while (curr.next !== null) {
		// console.log("curr: ", curr);
		curr = curr.next;
		// console.log("curr: ", curr);
	}
	curr.next = node;
	return head;
}

// console.log("val: ", val);

// ! Create a  ll with element --> arr = [1,2,3,4]
arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
	let val = insert(ll.head, arr[i]);
	ll.head = val;
}

console.log(ll);
