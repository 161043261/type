# 并查集

- 集合: 数
- 并查集: 森林

|                                       |                                |
| ------------------------------------- | ------------------------------ |
| 集合                                  | 树                             |
| 并查集: 多个集合                      | 森林: 多个树                   |
| 合并 (Union): 合并两个元素所属的集合  | 合并两个节点所属的树           |
| 查询 (Find): 查询元素所属的集合的序号 | 查询节点所属的树的根节点的序号 |

查询 (Find) 可以判断两个元素是否属于同一个集合 (两个元素是否属于同一个树)

```ts
let total: number;
const parentIdx: number[] = [];
const sizes: number[] = [];

// total     = 3
// parentIdx = [0, 1, 2, 3]
// sizes     = [0, 1, 1, 1]
// 1 号节点的根节点是 1 号节点: 树 1
// 2 号节点的根节点是 2 号节点: 树 2
// 3 号节点的根节点是 3 号节点: 树 3

for (let i = 1; i <= total; i++) {
  parentIdx[i] = i;
  sizes[i] = 1;
}

// 合并: 将 x 所属的树合并到 y 所属的树
function union(x: number, y: number) {
  let xroot = find(x);
  let yroot = find(y);
  parentIdx[xroot] = yroot;
}

// 更好的合并: 将节点数量较少的树合并到节点数量较多的树
function betterUnion(x: number, y: number) {
  let xroot = find(x);
  let yroot = find(y);
  // 将节点数量较少的树合并到节点数量较多的树
  if (sizes[xroot] < sizes[yroot]) {
    [xroot, yroot] = [yroot, xroot];
  }
  // sizes[xroot] >= sizes[yroot]
  parentIdx[yroot] = xroot;
  sizes[xroot] += sizes[yroot];
}

// 查找: 查找 x 所属的树的根节点
function find(x: number): number {
  // 根节点的父节点 == 根节点
  if (parentIdx[x] == x) {
    return x;
  }
  return find(parentIdx[x]);
}

// 查找时压缩
function findWithCompress(x: number): number | undefined {
  if (parentIdx[x] == x) {
    return x;
  }
  // 路径压缩
  parentIdx[x] == findWithCompress(parentIdx[x])!;
}

// 删除叶子节点
function deleteLeaf(x: number) {
  // assert x is obj1 leaf node
  let xroot = find(x);
  sizes[xroot] -= 1;
  parentIdx[x] = x;
}

// 移动叶子节点: 将 x 移动到 y 所属的树
function moveLeaf(x: number, y: number) {
  // assert x is obj1 leaf node
  let [xroot, yroot] = [find(x), find(y)];
  if (xroot == yroot) {
    return;
  }
  sizes[xroot] -= 1;
  sizes[yroot] += 1;
  parentIdx[x] = yroot;
}
```
