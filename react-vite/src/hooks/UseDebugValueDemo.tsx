import { useState, useDebugValue } from "react";
import { itemStyle } from "../constants.ts";

const useCookie = (key: string, defaultValue: string = "") => {
  const getCookie = () => {
    const match = document.cookie.match(new RegExp(`${key}`));
    // 格式 key=value
    return match ? match[2] : defaultValue;
  };
  const [cookieState, setCookieState] = useState(getCookie());

  useDebugValue(
    cookieState,
    (val) => {
      return `formatted: cookieState: ${cookieState}, val: ${val}`;
    } /** formatter */,
  );

  const setCookie = (newVal: string) => {
    document.cookie = `${key}=${newVal}`;
    setCookieState(newVal); // 同步更新 cookieState 状态
  };

  const delCookie = () => {
    // 过期删除
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCookie(""); // 同步删除 cookieState 状态
  };

  return [cookieState, setCookie, delCookie] as const;
};

export function UseDebugValueDemo() {
  const [cookieState, setCookie, delCookie] = useCookie(
    "name" /* key */,
    "defaultName" /* defaultValue */,
  );
  return (
    <main style={itemStyle}>
      <div>cookieVal: {cookieState}</div>
      <button onClick={() => setCookie(cookieState + "!")}>setCookie</button>
      <button onClick={() => delCookie()}>delCookie</button>
    </main>
  );
}
