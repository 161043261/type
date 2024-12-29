function rankTeams(votes: string[]): string {
  let maxLen = 0;
  votes.forEach((vote) => {
    maxLen = Math.max(maxLen, vote.length);
  });
  const alpha2cnts = new Map<string, number[]>();
  for (let i = 0; i < votes.length; i++) {
    for (let j = 0; j < votes[i].length; j++) {
      if (alpha2cnts.has(votes[i][j])) {
        const cnts = alpha2cnts.get(votes[i][j])!;
        cnts[j] = cnts[j] ? cnts[j] + 1 : 1;
        alpha2cnts.set(votes[i][j], cnts);
      } else {
        const cnts = new Array<number>(maxLen).fill(0);
        cnts[j] = 1;
        alpha2cnts.set(votes[i][j], cnts);
      }
    }
  }
  const alphaCnts = Array.from(alpha2cnts);
  alphaCnts.sort((item1, item2) => {
    const [alpha, cnts1] = item1;
    const [beta, cnts2] = item2;
    for (let i = 0; i < cnts1.length; i++) {
      if (cnts1[i] === cnts2[i]) {
        continue;
      }
      return -cnts1[i] + cnts2[i];
    }
    return alpha.charCodeAt(0) - beta.charCodeAt(0);
  });
  console.log(alphaCnts);
  let ans = "";
  for (let i = 0; i < alphaCnts.length; i++) {
    ans += alphaCnts[i][0];
  }
  return ans;
}

console.log(rankTeams(["BCA", "CAB", "CBA", "ABC", "ACB", "BAC"]));
