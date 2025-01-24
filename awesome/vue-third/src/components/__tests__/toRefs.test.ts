/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, test } from 'vitest'
import { reactive, ref, toRef, toRefs } from 'vue'

//! ./node_modules/.bin/vitest --run --testNamePattern=toRefs ./src/components/__tests__/toRefs.test.ts
test('toRefs', () => {
  const _toRefs = <T extends object>(obj: T) => {
    const ret: any = {}
    for (const key in obj) {
      ret[key] = toRef(obj, key)
    }
    return ret
  }

  const data = ref({ name: 'whoami', age: 1 })
  const { name, age } = _toRefs(data.value)
  const { name: name_, age: age_ } = toRefs(data.value)

  data.value.name = 'iamwho'
  data.value.age += 1

  expect(name.value).toEqual(data.value.name)
  expect(age.value).toEqual(data.value.age)
  expect(name_.value).toEqual(data.value.name)
  expect(age_.value).toEqual(data.value.age)

  const data2 = reactive({ name: 'whoami2', age: 2 })
  const { name: name2, age: age2 } = _toRefs(data2)
  const { name: name2_, age: age2_ } = toRefs(data2)

  data2.name = 'iamwho2'
  data2.age += 1

  expect(name2.value).toEqual(data2.name)
  expect(age2.value).toEqual(data2.age)
  expect(name2_.value).toEqual(data2.name)
  expect(age2_.value).toEqual(data2.age)
})
