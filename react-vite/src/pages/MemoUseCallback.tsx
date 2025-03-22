import React, { ChangeEvent, useCallback, useState } from "react";

const Child = React.memo(({ callback }: { callback: () => void }) => {
  console.log("Child is rendering");
  return <button onClick={callback}>I'm Child!</button>;
});

const MemoUseCallback: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const changeHandler = (ev: ChangeEvent<HTMLInputElement>) =>
    setInputVal(ev.target.value);
  // const callback = () => console.log("Goodbye Happiness");
  const callback = useCallback(() => console.log("Goodbye Happiness"), []);
  return (
    <div>
      <input type="text" value={inputVal} onChange={changeHandler} />
      <Child callback={callback} />
    </div>
  );
};

export default MemoUseCallback;
