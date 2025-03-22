import { describe, expect, it } from 'vitest'
import { reactive } from './__vue__/reactive.ts'

describe('ReactiveTest', () => {
  it('testReactive1', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
  })
})
