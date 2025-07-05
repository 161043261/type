/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSyncExternalStore } from "react";
export function useStorage(
  key: string,
  initialValue: any,
): [any, (value: any) => void] {
  const subscribe = (onStoreChange: () => void) => {
    console.log(onStoreChange.toString());
    // 订阅浏览器 api
    window.addEventListener("storage", onStoreChange);
    // 返回取消订阅
    return () => {
      window.removeEventListener("storage", onStoreChange);
    };
  };
  const getSnapshot = () => {
    console.log("getSnapshot, key:", key);
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key)!)
      : initialValue;
  };
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot /* , getServerSnapshot? */,
  );
  const setData = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    // 手动触发 storage 事件 => subscribe 订阅, 调用 onStoreChange
    window.dispatchEvent(new StorageEvent("storage"));
  };
  //! as const: 数组 Array 转元组 Tuple
  return [state, setData] as const;
}
