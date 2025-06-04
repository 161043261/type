/* eslint-disable @typescript-eslint/no-explicit-any */
// 使用高阶函数
const cache: () => MethodDecorator = () => {
  // 缓存参数数组到返回值的映射
  const args2returnVal = new Map<string, any>();
  return (target, propertyKey, descriptor: any) => {
    const originalMethod: any = descriptor.value;
    descriptor.value = function (...args) {
      // 使用 JSON.stringify 将参数数组转换为字符串
      const argsStr = JSON.stringify(args);
      if (args2returnVal.has(argsStr)) {
        console.log("Cache hit"); // 缓存命中
        return args2returnVal.get(argsStr);
      }
      console.log("Cache miss"); // 缓存未命中
      const returnVal = originalMethod.apply(this, args);
      args2returnVal.set(argsStr, returnVal);
      return returnVal;
    };
    return descriptor; // 返回装饰后的属性描述对象
  };
};

class Solution {
  @cache()
  minimumCoins(prices: number[]): number {
    // 未使用记忆化搜索
    const n = prices.length;
    const dfs = (i: number): number => {
      if (2 * i >= n) {
        return prices[i - 1];
      }
      let rest = Infinity;
      for (let j = i + 1; j <= i * 2 + 1; j++) {
        rest = Math.min(rest, dfs(j));
      }
      return prices[i - 1] + rest;
    };
    return dfs(1);
  }
}

const solution = new Solution();
for (let i = 0; i < 3; i++) {
  solution.minimumCoins([3, 1, 2]);
  solution.minimumCoins([1, 10, 1, 1]);
  solution.minimumCoins([26, 18, 6, 12, 49, 7, 45, 45]);
}
