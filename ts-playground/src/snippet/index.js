class RangeFreqQuery {
  /**
   *
   * @param {number[]} arr
   */
  constructor(arr) {
    /**
     * @type {Map<number, number[]>}
     */
    this.num2freqs = new Map();
    for (let i = 0; i < arr.length; i++) {
      if (this.num2freqs.has(arr[i])) {
        this.num2freqs.get(arr[i]).push(i);
      } else {
        this.num2freqs.set(arr[i], [i]);
      }
    }
  }

  /**
   *
   * @param {number} left
   * @param {number} right
   * @param {number} value
   */
  query(left, right, value) {
    // console.log(this.num2freqs);
    const arr = this.num2freqs.get(value);
    if (!arr) {
      return 0;
    }
    return this.lowerBound(arr, right + 1) - this.lowerBound(arr, left);
  }

  /**
   *
   * @param {number[]} arr
   * @param {number} target
   */
  lowerBound(arr, target) {
    let left = -1,
      right = arr.length;
    while (left + 1 < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] >= target) {
        right = mid;
      } else {
        left = mid;
      }
    }
    return right;
  }
}

const inst = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
inst.query(0, 0, 0);
