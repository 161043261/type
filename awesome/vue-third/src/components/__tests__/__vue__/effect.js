/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
class ReactiveEffect {
  _fn
  scheduler = undefined
  constructor(fn, scheduler) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    activeEffect = this
    return this._fn() /** fix: Add return value */
  }
}
let activeEffect
export function effect(fn, scheduler) {
  const reactiveEffect = new ReactiveEffect(fn, scheduler)
  reactiveEffect.run()
  return reactiveEffect /** fix: Add return value */
}
const targetMap = new WeakMap()
// 跟踪依赖
export function track(target, key) {
  let keyEffects = targetMap.get(target)
  if (!keyEffects) {
    keyEffects = new Map()
    targetMap.set(target, keyEffects)
  }
  let effectSet = keyEffects.get(key)
  if (!effectSet) {
    effectSet = new Set()
  }
  effectSet.add(activeEffect)
  keyEffects.set(key, effectSet)
  // console.log('keyEffects:', keyEffects)
}
// 触发更新
export function trigger(target, key) {
  const keyEffects = targetMap.get(target)
  const effects = keyEffects?.get(key)
  if (!effects) {
    return
  }
  for (const effect of effects) {
    if (effect.scheduler) {
      effect.scheduler?.()
    } else {
      effect.run()
    }
  }
}
