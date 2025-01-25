//! Syntax
import { test } from "vitest";

test("Test_Syntax", () => {
  const shorthandProperty = "shorthand property";
  const spreadProperty = ["str", 7, { shorthandProperty }];
  const obj = {
    prop_: "str",
    b: 7,
    c: {},

    get prop() {
      console.log("getter");
      return this.prop_;
    },

    set prop(newProp) {
      console.log("setter");
      this.prop_ = newProp;
    },

    1: "number literal property",
    "foo:bar": "string literal property",
    shorthandProperty,
    [Symbol.iterator /* expression */]: "computed property",
    __proto__: "prototype",
    ...spreadProperty,
  };

  // console.log(target);

  console.log(obj.prop_); // str
  obj.prop = "wtf"; // setter
  console.log(obj.prop); // getter wtf
});

//! JSON 语法对比对象字面语法
// JSON 对象的属性名只能是字符串
// JSON 对象的属性值只能是字符串, 数字, true, false, null, 数组或其他 JSON 对象
// JSON 语法是对象字面语法的真子集
