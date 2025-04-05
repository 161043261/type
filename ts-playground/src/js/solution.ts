function exist(board: string[][], word: string): boolean {
  const next = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const vis = Array.from({ length: board.length }, () =>
    new Array<boolean>(board[0].length).fill(false),
  );
  let path = "";
  let ans = false;
  const dfs = (y: number, x: number) => {
    if (!word.startsWith(path) || path.length > word.length) {
      return;
    }

    if (path === word) {
      ans = true;
      return;
    }

    for (const [dx, dy] of next) {
      const x2 = x + dx;
      const y2 = y + dy;
      if (
        y2 >= 0 &&
        y2 < board.length &&
        x2 >= 0 &&
        x2 < board[0].length &&
        !vis[y2][x2]
      ) {
        vis[y2][x2] = true;
        path += board[y2][x2];

        dfs(y2, x2);

        vis[y2][x2] = false;
        path = path.substring(0, path.length - 1);
      }
    }
  };

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      path = board[y][x];
      vis[y][x] = true;
      dfs(y, x);
      if (ans) {
        return ans;
      }
      vis[y][x] = false;
    }
  }
  return ans;
}

const board = [["a","a"]]
const word = "aaa";
const ans = exist(board, word);
console.log(ans);
