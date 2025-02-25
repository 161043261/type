import { useState, useDebugValue } from "react";
import { itemStyle } from "../constants.ts";

// 自定义 hook
const useCookie = (name: string, initialValue: string = "") => {
  const getCookie = () => {
    const match = document.cookie.match(new RegExp(`${name}`));
    return match ? match[2] : initialValue;
  };
  const [cookieState, setCookie] = useState(getCookie());

  useDebugValue(cookieState, (val) => {
    return `格式化输出: ${cookieState}, ${val}`;
  });
  const updateCookie = (newVal: string) => {
    document.cookie = `${name}=${newVal}`; // update cookie
    setCookie(newVal); // update state
  };
  const deleteCookie = () => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`; // 过期删除
    setCookie(""); // update state
  };
  return [cookieState, updateCookie, deleteCookie] as const;
};

export function UseDebugValueDemo() {
  const [cookieState, updateCookie, deleteCookie] = useCookie(
    "key" /* name */,
    "value" /* initialValue */,
  );
  return (
    <main style={itemStyle}>
      <div>cookieVal: {cookieState}</div>
      <button onClick={() => updateCookie(cookieState + "!")}>
        更新 cookie
      </button>
      <button onClick={() => deleteCookie()}>删除 cookie</button>
    </main>
  );
}
