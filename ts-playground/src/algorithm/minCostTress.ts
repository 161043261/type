/**
 * TODO
 *
 * @param okNodes
 * @param okProb
 * @param failProb
 */
function minCostTree(
  okNodes: string[],
  okProb: number[], // p
  failProb: number[], // q
) {
  const N = okNodes.length + 1;

  // Allocate DP array.
  const weights = Array.from(
    {
      length: N,
    },
    () => new Array<number>(N),
  ); // w
  const costs = Array.from(
    {
      length: N,
    },
    () => new Array<number>(N).fill(Infinity),
  ); // c
  const roots = Array.from(
    {
      length: N,
    },
    () => new Array<number>(N),
  ); // r

  // Initialize DP array.
  for (let i = 0; i < N; i++) {
    // Only has a fail node.
    weights[i][i] = failProb[i];
    costs[i][i] = 0; // No cost.
    roots[i][i] = 0; // Redundant.
  }

  for (let i = 0; i < N - 1; i++) {
    // Has a fail node, with an ok node as root.
    weights[i][i + 1] = failProb[i] + okProb[i + 1] + failProb[i + 1];
    costs[i][i + 1] = weights[i][i + 1];
    roots[i][i + 1] = i + 1;
  }

  // DP.
  // for (let i = 0; i < N - 1; i++) {
  //   for (let j = i + 1; j < N; j++) {
  //     // Either ok on okNode_j.
  //     // Or fail in (okNode_j, okNode_j+1) or (okNode_j, Infinity).
  //     weights[i][j] = weights[i][j - 1] + okProb[j] + failProb[j];

  //     for (let k = i + 1; k <= j; k++) {
  //       // Find the minimum cost.
  //       const tmpCost = costs[i][k - 1] + costs[k][j] + weights[i][j];
  //       if (tmpCost < costs[i][j]) {
  //         // Update minimums cost and root node.
  //         costs[i][j] = tmpCost;
  //         roots[i][j] = k;
  //       }
  //     }
  //   }
  // }

  // DP.
  for (let step = 1; step < N; step++) {
    for (let i = 0; i < N - step; i++) {
      const j = i + step;
      weights[i][j] = weights[i][j - 1] + okProb[j] + failProb[j];
      for (let k = i + 1; k <= j; k++) {
        // Find the minimum cost.
        const tmpCost = costs[i][k - 1] + costs[k][j] + weights[i][j];
        if (tmpCost < costs[i][j]) {
          // Update minimums cost and root node.
          costs[i][j] = tmpCost;
          roots[i][j] = k;
        }
      }
    }
  }
  console.log(weights);
  console.log(costs);
  console.log(roots);
}

// failNode == -Infinity
// failNode okNode1 okNode2 okNode3 okNode4
// failNode            => ok[0]   = 0
// (failNode, okNode1) => fail[0] = 2/16
//
// okNode1             => ok[1]   = 3/16
// (okNode1, okNode2)  => fail[1] = 3/16
//
// okNode2             => ok[2]   = 3/16
// (okNode2, okNode3)  => fail[2] = 1/16
//
// okNode3             => ok[3]   = 1/16
// (okNode3, okNode4)  => fail[3] = 1/16
//
// okNode4             => ok[4]   = 1/16
// (okNode4, Infinity) => fail[4] = 1/16
minCostTree(
  //            failNode    okNodes
  // nodeNames: anonymous   Mon   Thu   Tue   Wed
  // nodeVals:  -Infinity < Mon < Thu < Tue < Wed
  ["Mon", "Thu", "Tue", "Wed"],
  [0, 3, 3, 1, 1], // ok probability
  [2, 3, 1, 1, 1], // fail probability
);
