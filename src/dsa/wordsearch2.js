class TriNode {
  constructor() {
    this.children = {};
    this.word = null;
  }
}

function buildTrie(words) {
  const root = new TriNode();
  for (const word of words) {
    let node = root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TriNode();
      }
      node = node.children[char];
    }
    node.word = word;
  }
  return root;
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  let result = [];
  const root = buildTrie(words);
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (i, j, node) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] === "#") return;
    const char = board[i][j];
    const nextNode = node.children[char];
    if (!nextNode) return;
    if (nextNode.word) {
      result.push(nextNode.word);
      nextNode.word = null;
    }
    board[i][j] = "#";
    if (i + 1 < rows && board[i + 1][j] !== "#") {
      dfs(i + 1, j, nextNode);
    }
    if (i - 1 >= 0 && board[i - 1][j] !== "#") {
      dfs(i - 1, j, nextNode);
    }
    if (j + 1 < cols && board[i][j + 1] !== "#") {
      dfs(i, j + 1, nextNode);
    }
    if (j - 1 >= 0 && board[i][j - 1] !== "#") {
      dfs(i, j - 1, nextNode);
    }
    board[i][j] = char;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dfs(i, j, root);
    }
  }
  return result;
};

const board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
const words = ["oath", "pea", "eat", "rain"];
console.log(findWords(board, words)); // ["eat", "oath"]
