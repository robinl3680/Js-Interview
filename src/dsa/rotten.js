/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const rotten = [];
  let turn;
  let leftout = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 2) {
        rotten.push({ i, j, infection: 0 });
      }
      if (grid[i][j] === 1) {
        leftout++;
      }
    }
  }
  while (rotten.length) {
    const current = rotten.shift();
    const { i, j, infection } = current;
    turn = infection;
    if (i - 1 >= 0 && grid[i - 1][j] === 1) {
      rotten.push({ i: i - 1, j, infection: infection + 1 });
      grid[i - 1][j] = 2;
      leftout--;
    }
    if (i + 1 < grid.length && grid[i + 1][j] === 1) {
      rotten.push({ i: i + 1, j, infection: infection + 1 });
      grid[i + 1][j] = 2;
      leftout--;
    }
    if (j - 1 >= 0 && grid[i][j - 1] === 1) {
      rotten.push({ i, j: j - 1, infection: infection + 1 });
      grid[i][j - 1] = 2;
      leftout--;
    }
    if (j + 1 < grid[i].length && grid[i][j + 1] === 1) {
      rotten.push({ i, j: j + 1, infection: infection + 1 });
      grid[i][j + 1] = 2;
      leftout--;
    }
  }
  return leftout ? -1 : turn;
};

console.log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ])
); // 4
