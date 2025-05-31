class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  kthSmallest(k) {
    let count = 0;
    let result = null;

    const inOrderTraversal = (node) => {
      if (node === null || count >= k) return;

      inOrderTraversal(node.left);

      count++;
      if (count === k) {
        result = node.data;
        return;
      }

      inOrderTraversal(node.right);
    };

    inOrderTraversal(this.root);
    return result;
  }
}

// Example usage:
const bst = new BST();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(6);
bst.insert(8);
console.log(bst.kthSmallest(3)); // Output: 4 (the 3rd smallest element in the BST)
