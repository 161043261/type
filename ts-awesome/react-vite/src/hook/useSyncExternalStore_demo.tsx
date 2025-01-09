import { useStorage } from "./useSyncExternalStore_custom_hook";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseSyncExternelStoreDemo() {
  const [cnt, setCnt] = useStorage("cnt", 1);
  return (
    <div style={itemStyle}>
      <p>cnt: {cnt}</p>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        add
      </button>
      <button type="button" onClick={() => setCnt(cnt - 1)}>
        sub
      </button>
    </div>
  );
}
