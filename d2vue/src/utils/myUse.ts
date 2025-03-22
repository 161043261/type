/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { App } from 'vue'

interface Plugin {
  install?: (app: App, ...options: Array<any>) => any
}
const installed = new Set()

export function myUse<T extends Plugin>(plugin: T, ...options: Array<any>) {
  if (installed.has(plugin)) {
    console.warn(plugin, '重复注册')
  } else {
    // @ts-ignore
    plugin.install(this as App /** app */, ...options)
    installed.add(plugin)
  }
}
