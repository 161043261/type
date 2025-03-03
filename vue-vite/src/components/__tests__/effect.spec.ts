import { reactive } from './__vue__/reactive.ts'
import { effect } from './__vue__/effect.ts'
import { describe, expect, it } from 'vitest'

describe('EffectTest' /** 测试套件名 */, () => {
  it(/* .skip 跳过测试 */ 'testEffect1' /* 测试用例名 */, () => {
    const user /* 代理对象 */ = reactive({
      age: 10,
    })
    let nextAge
    effect(() => {
      nextAge = user.age /* get */ + 1
    })
    expect(nextAge).toBe(11)
    //! update
    user.age++ // get, set
    expect(nextAge).toBe(12)
  } /* 测试函数 */)
})
