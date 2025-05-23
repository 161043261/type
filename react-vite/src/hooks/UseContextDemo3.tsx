import { createContext, memo, useContext, useState } from "react";

interface IThemeCtx {
  color: string;
  background: string;
}

const themeCtx = createContext<IThemeCtx>({} as IThemeCtx);

const Demo = () => {
  const { color, background } = useContext<IThemeCtx>(themeCtx);
  return <div style={{ color, background }}>Demo</div>;
};

const MemoDemo = memo(() => <Demo />);

export default function UseContextDemo3() {
  const [theme, setTheme] = useState<IThemeCtx>({
    color: "lightblue",
    background: "lightgreen",
  });
  return (
    <div>
      <themeCtx.Provider value={theme}>
        <MemoDemo />
      </themeCtx.Provider>
      <button
        onClick={() =>
          setTheme({ color: theme.background, background: theme.color })
        }
      >
        swapColor
      </button>
    </div>
  );
}
