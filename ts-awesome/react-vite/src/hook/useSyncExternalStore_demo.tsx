import { useStorage } from "./useSyncExternalStore_custom_hook";
export function UseSyncExternelStoreDemo() {
  const [cnt, setCnt] = useStorage("cnt", 1);
  setCnt(2);
  return (
    <>
      <h1>cnt: {cnt}</h1>
      <button type="button" onClick={() => setCnt(cnt + 1)}>
        cnt++
      </button>
      <button type="button" onClick={() => setCnt(cnt - 1)}>
        cnt--
      </button>
    </>
  );
}
