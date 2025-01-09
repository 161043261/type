import { useSyncExternalStore } from "react";

export function useHistory(): [
  string,
  (url: string) => void,
  (url: string) => void,
] {
  const subscribe = (onUrlChange: () => void) => {
    // Vue 的路由模式: history, hash
    // history 底层是 popState, hash 底层是 hashChange
    window.addEventListener("popstate", onUrlChange);
    window.addEventListener("hashchange", onUrlChange);
    // 返回取消订阅
    return () => {
      window.removeEventListener("popstate", onUrlChange);
      window.removeEventListener("hashchange", onUrlChange);
    };
  };
  const getSnapshot = () => {
    return window.location.href;
  };
  const url = useSyncExternalStore(subscribe, getSnapshot);
  const push = (url: string) => {
    window.history.pushState({}, "", url);
  };
  const replace = (url: string) => {
    window.history.replaceState({}, "", url);
  };
  //! as const: 数组 Array 转元组 Tuple
  return [url, push, replace] as const;
}
