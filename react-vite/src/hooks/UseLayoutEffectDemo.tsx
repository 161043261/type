import { useEffect, useState } from "react";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
  overflow: "auto",
};

export function UseLayoutEffectDemo() {
  const [cnt, setCnt] = useState(0);
  // CPU 4 倍降速
  //! useEffect 不阻塞 DOM
  useEffect(() => {
    for (let i = 0; i < 5000; i++) {
      setCnt((cnt) => cnt + 1);
    }
  }, []);
  // CPU 4 倍降速
  //! useLayoutEffect 阻塞 DOM
  // useLayoutEffect(() => {
  //   for (let i = 0; i < 5000; i++) {
  //     setCnt((cnt) => cnt + 1);
  //   }
  // }, []);

  return (
    <div style={itemStyle}>
      0...5000
      {Array.from({
        length: cnt,
      }).map((_, idx) => (
        <div key={idx}>{idx}</div>
      ))}
    </div>
  );
}
