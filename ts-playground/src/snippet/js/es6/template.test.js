/* eslint-disable @typescript-eslint/no-unused-expressions */
import { test } from "vitest";

test("Test1", () => {
  let code = "console.log('Hello, World!')";
  eval(code); // Hello, World!
});

test("Test2", () => {
  let a = 5;
  let b = 10;

  function tag(strs /* TemplateStringArray */, insert1, insert2) {
    // 2 个插值 => 模板字符串数组长度为 3
    console.log(strs); // [ 'Hello ', ' world ', '' ]
    // 第 1 个插值
    console.log(insert1); // 15
    // 第 2 个插值
    console.log(insert2); // 50
    return "Done!";
  }

  // 等价于 tag1(["Hello ", " world ", ""], 15, 50)
  console.log(tag`Hello ${a + b} world ${a * b}`); // Done!
});

test("Test3", () => {
  let total = 30;
  let msg = tag`The total is ${total} (${total * 2} with tax)`;

  function tag(strs /* TemplateStringArray */) {
    for (const arg of arguments) {
      // ["The total is ", " (", " with tax)"];
      // 30
      // 60
      console.log(arg);
    }
    // 2 个插值 => 模板字符串数组长度为 3
    console.log(strs === arguments[0]); // true
    let ret = "";
    for (let i = 1; i < arguments.length; i++) {
      ret += strs[i - 1];
      ret += arguments[i];
    }
    ret += strs[strs.length - 1];
    return ret + ", handled by tag1";
  }

  // The total is 30 (60 with tax), handled by tag1
  console.log(msg);

  // 使用剩余参数 ...inserts
  let msg1 = tag1`The total is ${total} (${total * 3} with tax)`;

  function tag1(strs /* TemplateStringArray */, ...inserts) {
    let ret = "";
    for (let i = 0; i < inserts.length; i++) {
      ret += strs[i];
      ret += inserts[i];
    }
    ret += strs[strs.length - 1];
    return ret + ", handled by tag2";
  }

  // The total is 30 (90 with tax), handled by tag2
  console.log(msg1);
});

// 标签模板的重要应用: 过滤 HTML 字符串中的恶意代码
test("Test4", () => {
  let sender = '<script>alert("wtf")</script>'; // 恶意代码
  let rawHTML = `<p>${sender} sent u a msg</p>`;
  let safeHTML = SafeHTML`<p>${sender} sent u a msg</p>`;

  function SafeHTML(strs /* TemplateStringArray */, ...inserts) {
    let ret = "";
    for (let i = 0; i < inserts.length; i++) {
      let insert = String(inserts[i]);
      ret += strs[i];
      ret += insert
        .replace(/&/g, "&amp;") // & => &amp;
        .replace(/</g, "&lt;") // < => &lt;
        .replace(/>/g, "&gt;"); // > => &gt;
    }
    ret += strs[strs.length - 1];
    return ret;
  }

  // <p><script>alert("wtf")</script> sent u obj1 msg1</p>
  console.log(rawHTML);
  // <p>&lt;script&gt;alert("wtf")&lt;/script&gt; sent u obj1 msg1</p>
  console.log(safeHTML);
});

test("Test5", () => {
  // 0 个插值 => 模板字符串数组长度为 1
  console.log`123`; // [ '123' ]

  function tag(
    templateStringArray /* : {
  [key: number]: string;
  length: number;
  raw: readonly string[];
} */,
  ) {
    // 0 个插值 => 模板字符串数组长度为 1
    console.log(templateStringArray.length); // 1
    console.log(templateStringArray.raw); // [ 'first-row\\nsecond-row' ]
    return "Done!";
  }

  console.log(tag`first-row\nsecond-row`); // Done!
});
