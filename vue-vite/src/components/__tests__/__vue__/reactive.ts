/* eslint-disable @typescript-eslint/no-explicit-any */
import { track, trigger } from './effect'
// import { track, trigger } from './effect_with_class'

function isObject(target: any): boolean {
  return target !== null && typeof target === 'object'
}

export function reactive<T extends object>(target: T) {
  return new Proxy(target /** 被代理对象 */, {
    // 拦截获取属性操作
    get(target, key, receiver) {
      const ret = Reflect.get(target, key, receiver)
      track(target, key) /** 跟踪依赖 */
      // return ret
      if (isObject(ret)) {
        return reactive(ret as object)
      }
      return ret
    },
    // 拦截设置属性操作
    set(target, key, value, receiver) {
      const ret = Reflect.set(target, key, value, receiver)
      trigger(target, key) /** 触发更新 */
      return ret
    },
  })
}
