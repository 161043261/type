/* eslint-disable @typescript-eslint/no-unused-vars */
function solution(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
    return -1;
  }
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const visited = new Array(n).fill(0).map(() => new Array(n).fill(false));
  const queue = [];
  queue.push({ x: 0, y: 0, dist: 1 });
  visited[0][0] = true;
  while (queue.length > 0) {
    const { x, y, dist } = queue.shift();
    if (x === n - 1 && y === n - 1) {
      return dist;
    }
    for (const dir of directions) {
      const newX = x + dir[0];
      const newY = y + dir[1];
      if (
        newX >= 0 &&
        newX < n &&
        newY >= 0 &&
        newY < n &&
        grid[newX][newY] === 0 &&
        !visited[newX][newY]
      ) {
        visited[newX][newY] = true;
        queue.push({ x: newX, y: newY, dist: dist + 1 });
      }
    }
  }
  return -1;
}
