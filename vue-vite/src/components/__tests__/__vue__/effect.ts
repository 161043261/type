/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */

class ReactiveEffect {
  private _fn: (...args: any[]) => any
  scheduler?: () => void = undefined
  constructor(fn: (...args: any[]) => any, scheduler?: () => void) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run(): any {
    activeEffect = this
    return this._fn() /** fix: Add return value */
  }
}

let activeEffect: ReactiveEffect

export function effect(fn: (...args: any[]) => any, scheduler?: () => void): ReactiveEffect {
  const reactiveEffect = new ReactiveEffect(fn, scheduler)
  reactiveEffect.run()
  return reactiveEffect /** fix: Add return value */
}

const targetMap = new WeakMap<object, Map<string | symbol, Set<ReactiveEffect>>>()

// 跟踪依赖
export function track(target: object, key: string | symbol): void {
  let keyEffects = targetMap.get(target)
  if (!keyEffects) {
    keyEffects = new Map<string | symbol, Set<ReactiveEffect>>()
    targetMap.set(target, keyEffects)
  }
  let effectSet = keyEffects.get(key)
  if (!effectSet) {
    effectSet = new Set<ReactiveEffect>()
  }
  effectSet.add(activeEffect)
  keyEffects.set(key, effectSet)
  // console.log('keyEffects:', keyEffects)
}

// 触发更新
export function trigger(target: object, key: string | symbol): void {
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
