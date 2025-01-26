import { test } from "vitest";

test("Test1", () => {
  console.log(String.raw`foo\n${1 + 2}bar`);

  // `foo\n${1 + 2}bar` 等价于
  const templateStr = String.raw(
    {
      raw: ["foo\n", "bar"], // 模板字符串数组
    },
    1 + 2 /*插值*/,
  );

  console.log(templateStr === `foo\n${1 + 2}bar`); // true
});
