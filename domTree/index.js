function findNodeByProperty(rootNode, property, path = []) {
  debugger;
  if (!rootNode || !property) {
    return null;
  }

  if (getComputedStyle(rootNode).color === "rgb(255, 0, 0)") {
    return path;
  }

  let child = rootNode.firstElementChild;
  let index = 0;

  while (child) {
    path.push(index);
    const result = findNodeByProperty(child, property, path);
    if (result) {
      return result;
    }
    path.pop();
    child = child.nextElementSibling;
    index++;
  }

  return null;
}

function getNodeByPath(rootNode, path) {
  let currentNode = rootNode;

  for (let i = 0; i < path.length; i++) {
    const index = path[i];
    currentNode = currentNode.children[index];
    if (!currentNode) {
      return null;
    }
  }

  return currentNode;
}

// Example DOM trees
const tree1RootElement = document.getElementById("tree1");
const tree2RootElement = document.getElementById("tree2");

// Find the node in the first tree based on the CSS property
const pathToNodeInTree1 = findNodeByProperty(tree1RootElement, "color");

if (pathToNodeInTree1) {
  // Locate the corresponding node in the second tree
  const nodeInTree2 = getNodeByPath(tree2RootElement, pathToNodeInTree1);

  if (nodeInTree2) {
    // Do something with the corresponding nodes in both trees
    /*  console.log('Node in Tree 1:', getNodeByPath(tree1RootElement, pathToNodeInTree1)); */
    console.log("Node in Tree 2:", nodeInTree2.innerHTML);
  } else {
    console.log("Node not found in Tree 2.");
  }
} else {
  console.log("Node not found in Tree 1.");
}
