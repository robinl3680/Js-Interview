// Node constructor function
function Node(data) {
  this.data = data;
  this.next = null;
}

// LinkedList constructor function
function LinkedList() {
  this.head = null;
}

// Add a node to the end of the list
LinkedList.prototype.add = function (data) {
  const newNode = new Node(data);
  if (this.head === null) {
    this.head = newNode;
  } else {
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }
};

// Delete a node with specific data
LinkedList.prototype.delete = function (data) {
  if (this.head === null) {
    return;
  }
  if (this.head.data === data) {
    this.head = this.head.next;
    return;
  }
  let current = this.head;
  while (current.next !== null && current.next.data !== data) {
    current = current.next;
  }
  if (current.next !== null) {
    current.next = current.next.next;
  }
};

// Print all nodes in the list
LinkedList.prototype.print = function () {
  let current = this.head;
  while (current !== null) {
    console.log(current.data);
    current = current.next;
  }
};

// Example usage
const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);
list.print(); // Output: 1 2 3
list.delete(2);
list.print(); // Output: 1 3

const list2 = new LinkedList();
list2.add("a");
list2.add("b");
list2.add("c");
list2.print(); // Output: a b c
