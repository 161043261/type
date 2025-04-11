import { ChangeEvent, useMemo, useState } from "react";

const UseMemoDemo: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [nums, setNums] = useState([1, 2]);
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) =>
    setInputVal(ev.target.value);
  // calcSum 未使用 useMemo, 每次重新渲染时都会重新计算
  const calcSum = () => {
    console.log("Calculating sum");
    return nums[0] + nums[1];
  };
  // computedProduct 使用 useMemo, 仅当依赖项改变时才会重新计算
  const computedProduct = useMemo<number>(() => {
    console.log("Computing product");
    return nums[0] * nums[1];
  }, [nums]);
  const addNum0 = () => setNums([++nums[0], nums[1]]);
  const addNum1 = () => setNums([nums[0], ++nums[1]]);
  return (
    <div>
      {/* 修改 inputVal 状态时, 触发重新渲染 */}
      <input type="text" value={inputVal} onChange={handleChange} />
      <div>nums: {JSON.stringify(nums)}</div>
      <div>sum: {calcSum()}</div>
      <div>product: {computedProduct}</div>
      <button onClick={addNum0}>addNum0</button>
      <button onClick={addNum1}>addNum1</button>
    </div>
  );
};

export default UseMemoDemo;
