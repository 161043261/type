/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSubPath(head, root) {
  // bfs
  const queue = [];
  queue.push(root);
  while (queue.length > 0) {
    const node = queue.shift();
    if (bfs(head, node)) {
      return true;
    }
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return false;
}

/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
function bfs(head, root) {
  if (head === null) {
    return true;
  }
  if (root === null || head.val !== root.val) {
    return false;
  }
  // head !== null, root !== null
  return bfs(head.next, root.left) || bfs(head.next, root.right);
}
