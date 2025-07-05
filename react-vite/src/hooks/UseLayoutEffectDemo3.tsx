import { useLayoutEffect } from "react";

// 案例: 记录滚动条的位置
const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

// export function UseLayoutEffectDemo3() {
//   useLayoutEffect(() => {
//     const demoList = document.getElementById(
//       "useLayoutEffect__demo-list"
//     ) as HTMLUListElement;
//     demoList.scrollTop = 2000;
//   }, []);
//   return (
//     <div style={itemStyle}>
//       <ul
//         id="useLayoutEffect__demo-list"
//         style={{ height: "200px", overflowY: "scroll" }}
//       >
//         {Array.from({ length: 500 }, (_, idx) => (
//           <li key={idx}>item{idx}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export function UseLayoutEffectDemo3() {
  const scrollHandler = (ev: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = ev.currentTarget.scrollTop;
    //! 将 scrollTop 写到地址栏
    // http://localhost:5173/?top=2000
    window.history.replaceState({}, "", `?top=${scrollTop}`);
  };
  // 观察滚动条, 异步的 useEffect 可能会导致闪烁
  // useEffect(() => {
  // 同步的 useLayoutEffect 可以避免闪烁
  useLayoutEffect(() => {
    const demoDiv = document.getElementById(
      "useLayoutEffect__demo-div3",
    ) as HTMLDivElement;
    console.log(window.location.search); // e.g. ?top=1000
    const top = window.location.search.split("=")[1];
    demoDiv.scrollTop = Number(top) || 0;
  });
  return (
    <div
      onScroll={scrollHandler}
      id="useLayoutEffect__demo-div3"
      style={{
        ...itemStyle,
        height: "200px",
        overflow: "auto",
      }}
    >
      {Array.from({ length: 500 }).map((_, idx) => (
        <div key={idx}>item{idx}</div>
      ))}
    </div>
  );
}
