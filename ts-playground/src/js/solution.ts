interface ICrumb {
  timeStamp: number;
}

class Breadcrumbs {
  heapCap = 20;
  minHeap: ICrumb[] = [];
  constructor(maxBreadcrumbs_ = 20) {
    this.heapCap = maxBreadcrumbs_;
  }

  push(...data: ICrumb[]) {
    data = data.slice(0, this.heapCap);
    this.minHeap.unshift(...data);
    this.minHeap.slice(0, this.heapCap);
    this.buildMinHeap(data.length - 1, this.minHeap.length);
    return;
  }

  buildMinHeap(lastHeapifyIdx: number, heapSize: number) {
    const lastLeafIdx = heapSize - 1;
    const lastNonLeafIdx = Math.floor((lastLeafIdx - 1) / 2);
    lastHeapifyIdx = Math.min(lastHeapifyIdx, lastNonLeafIdx);
    for (let i = lastHeapifyIdx; i >= 0; i--) {
      this.minHeapify(i, heapSize);
    }
  }

  minHeapify(idx: number, heapSize: number) {
    let childIdx = idx;
    const left = idx * 2 + 1;
    const right = idx * 2 + 2;
    if (
      left < heapSize &&
      this.minHeap[left].timeStamp < this.minHeap[childIdx].timeStamp
    ) {
      childIdx = left;
    }
    if (
      right < heapSize &&
      this.minHeap[right].timeStamp < this.minHeap[childIdx].timeStamp
    ) {
      childIdx = right;
    }
    if (childIdx !== idx) {
      [this.minHeap[idx], this.minHeap[childIdx]] = [
        this.minHeap[childIdx],
        this.minHeap[idx],
      ];
      this.minHeapify(childIdx, heapSize);
    }
  }

  getAndClearHeap() {
    const ret = this.minHeap;
    this.minHeap = [];
    return ret;
  }
}

const breadcrumbs = new Breadcrumbs();
breadcrumbs.push({ timeStamp: 1 }, { timeStamp: 2 });
breadcrumbs.push({ timeStamp: 3 });
console.log(breadcrumbs.getAndClearHeap());
breadcrumbs.push({ timeStamp: 4 }, { timeStamp: 5 }, { timeStamp: 6 });
console.log(breadcrumbs.minHeap);
