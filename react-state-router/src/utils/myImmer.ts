/* eslint-disable @typescript-eslint/no-explicit-any */
const obj = {
  user: {
    name: 'whoami',
    age: 22,
  },
}

function produce<T extends object>(base: T, fn: (draft: T) => void) {
  const baseClone: Record<string | symbol, any> = {}

  const handler: ProxyHandler<T> = {
    get(target: Record<string | symbol, any>, prop, receiver) {
      if (prop in baseClone) {
        return baseClone[prop]
      }

      if (typeof target[prop] === 'object' && target[prop] !== null) {
        return new Proxy(target[prop], handler)
      }

      return Reflect.get(target, prop, receiver)
    },

    set(target, prop, newValue) {
      return Reflect.set(baseClone, prop, newValue)
    },
  }

  const baseProxy = new Proxy(base, handler)
  fn(baseProxy)

  if (Object.keys(baseClone).length === 0) {
    return base
  }

  return JSON.parse(JSON.stringify(baseProxy))
}

const newObj = produce(obj, (draft) => {
  draft.user.name = 'immer'
  draft.user.age = 23
})

console.log(obj)
console.log(newObj)
