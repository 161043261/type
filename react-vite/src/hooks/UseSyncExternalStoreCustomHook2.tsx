import { useSyncExternalStore } from "react";

export function useHistory(): [
  string,
  (url: string) => void, // push
  (url: string) => void, // replace
] {
  const subscribe = (onUrlChange: () => void) => {
    // Vue 的路由模式: history, hash
    // hash 底层是监听 hashchange 事件, 修改 location.hash 值
    // history 底层是
    // 1. 监听 popstate 事件 (点击浏览器的前进/后退按钮, 调用 history.go() 时会触发 popstate 事件)
    // 2. 对于编程式导航, router.push() 会调用 history.pushState()
    //    调用 history.pushState() 不会触发 popstate 事件
    // 3. 对于编程式导航, router.replace() 会调用 history.replaceState()
    //    调用 history.replaceState() 不会触发 popstate 事件
    window.addEventListener("popstate", onUrlChange);
    // window.addEventListener("hashchange", onUrlChange);
    // 返回取消订阅
    return () => {
      window.removeEventListener("popstate", onUrlChange);
      // window.removeEventListener("hashchange", onUrlChange);
    };
    //! popstate 只能监听浏览器前进和后退按钮
    //! 不能监听 window.history.pushState 和 window.history.replaceState
  };
  const getSnapshot = () => {
    return window.location.href;
  };
  const url = useSyncExternalStore(subscribe, getSnapshot);
  const push = (url: string) => {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  const replace = (url: string) => {
    window.history.replaceState({}, "", url);
    // 手动触发 popstate 事件 => 订阅触发 getSnapshot()
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  //! as const: 数组 Array 转元组 Tuple
  return [url, push, replace] as const;
}
