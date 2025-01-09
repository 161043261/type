import { useHistory } from "./useSyncExternalStore_custom_hook2";

const itemStyle = {
  border: "1px solid lightblue",
  borderRadius: "10px",
  padding: "5px",
};

export function UseSyncExternelStoreDemo2() {
  const [url, push, replace] = useHistory();
  return (
    <div style={itemStyle}>
      <p>url: {url}</p>
      <button type="button" onClick={() => push("/push")}>
        push
      </button>
      <button type="button" onClick={() => replace("/replace")}>
        replace
      </button>
    </div>
  );
}
