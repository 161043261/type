//            v0         v1         v2         v3         v4
// v0          0   Infinity          1   Infinity         10
// v1   Infinity          0   Infinity          1          5
// v2   Infinity          1          0   Infinity          7
// v3   Infinity   Infinity   Infinity          0          1
// v4   Infinity   Infinity   Infinity   Infinity          0

const graph = [
  [0, Infinity, 1, Infinity, 10],
  [Infinity, 0, Infinity, 1, 5],
  [Infinity, 1, 0, Infinity, 7],
  [Infinity, Infinity, Infinity, 0, 1],
  [Infinity, Infinity, Infinity, Infinity, 0],
];
const n = graph.length;
const path = Array.from(
  {
    length: n,
  },
  () => new Array(n).fill(-1),
);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      if (graph[i][k] + graph[k][j] < graph[i][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
        path[i][j] = k;
      }
    }
  }
}

console.log(graph);
console.log(path);
