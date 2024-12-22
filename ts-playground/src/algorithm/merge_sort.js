/**
 *
 * @param {number[]} arr
 */
function mergeSort(arr) {
  let cnt = 1;
  for (let jump = 1; jump < arr.length; jump *= 2, cnt++) {
    let tmpStr = "";
    for (let start = 0; start < arr.length; start += 2 * jump) {
      const lSlice = arr.slice(start, Math.min(arr.length, start + jump));
      tmpStr += `${lSlice}:`.replaceAll(",", " ");
      if (start + jump >= arr.length) {
        let lIdx = 0,
          idx = start;
        while (lIdx < lSlice.length) {
          arr[idx] = lSlice[lIdx];
          idx++;
          lIdx++;
        }
        break;
      }
      const rSlice = arr.slice(
        start + jump,
        Math.min(arr.length, start + 2 * jump),
      );
      tmpStr += `${rSlice}|`.replaceAll(",", " ");
      let lIdx = 0,
        rIdx = 0,
        idx = start;
      while (lIdx < lSlice.length && rIdx < rSlice.length) {
        if (lSlice[lIdx] < rSlice[rIdx]) {
          arr[idx] = lSlice[lIdx];
          idx++;
          lIdx++;
        } else {
          arr[idx] = rSlice[rIdx];
          idx++;
          rIdx++;
        }
      }
      while (lIdx < lSlice.length) {
        arr[idx] = lSlice[lIdx];
        idx++;
        lIdx++;
      }
      while (rIdx < rSlice.length) {
        arr[idx] = rSlice[rIdx];
        idx++;
        rIdx++;
      }
    }
    console.log(`===== turn: ${cnt}, jump: ${jump} =====`);
    console.log(tmpStr.slice(0, -1));
    console.log(`${arr}\n`.replaceAll(",", " "));
  }
}

let arr = [2, 4, 7, 5, 9, 2, 0, 4, 9, 7];
mergeSort(arr);
console.log(`Merge Sort: [${arr}]`.replaceAll(",", " "));
