const Cached: () => MethodDecorator = () => {
  // 缓存参数列表到返回值的映射
  const args2retVal = new Map<string, any>();
  return (target, propertyKey, descriptor: any) => {
    const originalMethod: any = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // 使用 JSON.stringify 将参数列表转换为字符串
      const argsStr = JSON.stringify(args);
      if (args2retVal.has(argsStr)) {
        console.log("Cache hit"); // 缓存命中
        return args2retVal.get(argsStr);
      }
      console.log("Cache miss"); // 缓存未命中
      const returnVal = originalMethod.apply(this, args);
      args2retVal.set(argsStr, returnVal);
      return returnVal;
    };
    return descriptor; // 修改属性描述对象
  };
};

class Solution {
  @Cached()
  calcSum(prices: number[]): number {
    return prices.reduce((acc, val) => acc + val, 0);
  }
}

const solution = new Solution();
for (let i = 0; i < 3; i++) {
  console.log(solution.calcSum([1, 2, 3]));
  console.log(solution.calcSum([1, 2, 3, 4]));
  console.log(solution.calcSum([1, 2, 3, 4, 5]));
}
