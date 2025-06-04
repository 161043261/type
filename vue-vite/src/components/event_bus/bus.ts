/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
type IBus = {
  publish: (eventType: string) => void
  subscribe: (eventType: string, callback: Function) => void
}

type TEvName2cbs = {
  [key: string | number | symbol]: Array<Function>
}

class Bus implements IBus {
  evName2cbs: TEvName2cbs

  constructor() {
    this.evName2cbs = {}
  }

  // 发布 publish
  publish(eventType: string, ...args: any[]): void {
    const callbacks = this.evName2cbs[eventType]
    callbacks.forEach((cb) => cb.apply(this, args))
  }

  // 订阅 subscribe
  subscribe(eventType: string, fn: Function): void {
    const callbacks = this.evName2cbs[eventType] || []
    callbacks.push(fn)
    this.evName2cbs[eventType] = callbacks
  }
}

export default new Bus()
