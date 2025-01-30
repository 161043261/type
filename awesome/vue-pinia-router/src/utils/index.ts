import { isRef, unref } from "vue"

/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepToRaw(observed: any) {
  const isObject = (val: any) => val !== null && typeof val === 'object'
  // unref(obj)
  // 如果 obj 是 ref 创建的响应式对象, 则返回 obj.value; 否则直接返回 obj
  const val = isRef(observed) ? unref(observed) : observed
  if (!isObject(val)) {
    return val
  }
  if (Array.isArray(val)) {
    const rawArr: any[] = []
    val.forEach((item) => {
      rawArr.push(deepToRaw(item))
    })
    return rawArr
  }
  const rawObj: any = {}
  Object.keys(val).forEach((key) => {
    rawObj[key] = deepToRaw(val[key])
  })
  return rawObj
}
