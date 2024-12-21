/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict";
function minAnagramLength(s) {
  tag: for (let len = 1; len < s.length; len++) {
    if (s.length % len != 0) {
      continue;
    }
    const ch2cnt = new Map();
    for (const ch of s.slice(0, len)) {
      ch2cnt.set(ch, (ch2cnt.get(ch) || 0) + 1);
    }
    for (let start = len; start < s.length; start += len) {
      const tmp = new Map();
      for (const ch of s.slice(start, start + len)) {
        tmp.set(ch, (tmp.get(ch) || 0) + 1);
      }
      for (const [ch, cnt] of ch2cnt) {
        if (!tmp.has(ch) || cnt != tmp.get(ch)) {
          continue tag;
        }
      }
    }
    return len;
  }
  return s.length;
}
function sortTheStudents(score, k) {
  return score.sort((a, b) => a[k] - b[k]);
}
