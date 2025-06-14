import { createContext, useContext } from "react";

interface IThemeCtx {
  color: string;
  background: string;
}

const themeCtx = createContext<IThemeCtx>({} as IThemeCtx);

const Demo = () => {
  const { color, background } = useContext<IThemeCtx>(themeCtx);
  return <div style={{ color, background }}>Demo</div>;
};

const Demo2 = ({ color, background }: IThemeCtx) => (
  <div style={{ color, background }}>Demo2</div>
);

export default function ContextDemo() {
  return (
    <themeCtx.Provider value={{ color: "lightblue", background: "lightgreen" }}>
      {/* Provider + useContext */}
      <Demo />
      {/* Provider + Consumer */}
      <themeCtx.Consumer>
        {(value: IThemeCtx) => <Demo2 {...value} />}
      </themeCtx.Consumer>
    </themeCtx.Provider>
  );
}
