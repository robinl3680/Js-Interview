function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const insertNode = (node, value) => {
      if (!node) {
        return new Node(value);
      }
      if (value < node.value) {
        node.left = insertNode(node.left, value);
      } else {
        node.right = insertNode(node.right, value);
      }
      return node;
    };

    this.root = insertNode(this.root, value);
  }
  log() {
    const logNode = (node) => {
      if (!node) return;
      logNode(node.left);
      console.log(node.value);
      logNode(node.right);
    };
    logNode(this.root);
  }
}

const bst = new BST();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(6);
bst.insert(8);
bst.log(); // Output: 2 3 4 5 6 7 8

function findKthSmallest(root, k) {
  let count = 0;
  let result = null;

  const inorder = (node) => {
    if (!node || count >= k) return;

    inorder(node.left);
    count++;
    if (count === k) {
      result = node.value;
      return;
    }
    inorder(node.right);
  };

  inorder(root);
  return result;
}

const kthSmallest = findKthSmallest(bst.root, 3);
console.log(kthSmallest); // Output: 4
