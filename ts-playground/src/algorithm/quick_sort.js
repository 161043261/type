/**
 *
 * @param {any[]} arr
 * @param {number} start
 * @param {number} end
 */
function quickSort(arr, start, end) {
  /////////////////////////////////////////////
  if (end - start === 0 || end - start === 1) {
    return;
  }
  /////////////////////////////////////////////
  const pivot = arr[start];
  console.log(
    `
start: ${start}
  end: ${end}
pivot: ${pivot}
  arr: ${arr}`.replaceAll(",", " "),
  );
  for (let l = start, r = end - 1; l <= r; ) {
    while (arr[r] >= pivot && r > l) {
      r--;
    }
    if (r === l) {
      arr[l] = pivot;
      console.log(`===== [${arr}] =====`.replaceAll(",", " "));
      quickSort(arr, start, l);
      quickSort(arr, l + 1, end);
      return;
    }
    // r > l
    arr[l] = arr[r];
    l++;
    while (arr[l] <= pivot && r > l) {
      l++;
    }
    if (r === l) {
      arr[r] = pivot;
      console.log(`===== [${arr}] =====`.replaceAll(",", " "));
      quickSort(arr, start, r);
      quickSort(arr, r + 1, end);
      return;
    }
    arr[r] = arr[l];
    r--;
  }
}

let arr = [49, 38, 65, 97, 76, 13, 27, 49];
quickSort(arr, 0, arr.length);
console.log(`\nQuick Sort: [${arr}]`.replaceAll(",", " "));
