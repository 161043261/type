/* eslint-disable @typescript-eslint/no-explicit-any */
import { effect } from './effect'
export function computed(getter) {
  const reactiveEffect = effect(
    getter /** fn */,
    () => {
      dirty = true
    } /** scheduler */,
  )
  let cachedVal
  let dirty = true
  console.log(
    'reactiveEffect._fn:',
    Reflect.getOwnPropertyDescriptor(reactiveEffect, '_fn')?.value.toString(),
  )
  class ComputedRefImpl {
    get value() {
      // 脏值检测
      if (dirty) {
        // 刷新缓存
        cachedVal = reactiveEffect.run()
        dirty = false
      }
      return cachedVal // return reactiveEffect._fn()
    }
  }
  return new ComputedRefImpl()
}
