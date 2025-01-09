/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSyncExternalStore } from "react";
export function useStorage(key: string, initialValue: any) {
  const subscribe = (callback: () => void) => {
    // 订阅浏览器 api
    window.addEventListener("storage", callback);
    return () => {
      // 返回取消订阅
      window.removeEventListener("storage", callback);
    };
  };
  const getSnapshot = () => {
    return localStorage.getItem(key) || initialValue;
  }
  const state = useSyncExternalStore(subscribe, getSnapshot);
  const updateStorage = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  return [state, updateStorage]
}
