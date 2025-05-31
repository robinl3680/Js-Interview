/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const rows = board.length;
  const cols = board[0].length;
  const track = (i, j, k) => {
    if (k === word.length) return true;
    if (
      i < 0 ||
      i >= rows ||
      j < 0 ||
      j >= cols ||
      board[i][j] !== word.charAt(k)
    )
      return false;
    const current = board[i][j];
    board[i][j] = "0";
    const result =
      track(i - 1, j, k + 1) ||
      track(i + 1, j, k + 1) ||
      track(i, j - 1, k + 1) ||
      track(i, j + 1, k + 1);
    board[i][j] = current;
    return result;
  };
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (track(i, j, 0)) {
        return true;
      }
    }
  }
  return false;
};

console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCSEEDA"
  )
); // true
