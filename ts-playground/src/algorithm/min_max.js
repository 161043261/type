/**
 *
 * @param {number[]} arr
 */
function minMax(arr) {
  if (arr.length === 1) {
    return {
      min: arr[0],
      max: arr[0],
    };
  }
  const lRet = minMax(arr.slice(0, arr.length / 2));
  const rRet = minMax(arr.slice(arr.length / 2));
  return {
    min: lRet.min < rRet.min ? lRet.min : rRet.min,
    max: lRet.max > rRet.max ? lRet.max : rRet.max,
  };
}

console.log(minMax([1, 6, 1, 0, 4, 3, 2, 6, 1]));
