import { createContext, useState } from "react";

interface IThemeCtx {
  color: string;
  background: string;
  name: string;
}

interface ILangCtx {
  lang: string;
  name: string;
}

const themeCtx = createContext<IThemeCtx>({} as IThemeCtx);
const langCtx = createContext<ILangCtx>({} as ILangCtx);

const Child = () => {
  return (
    <themeCtx.Consumer>
      {(themeVal) => {
        return (
          <langCtx.Consumer>
            {(langVal) => {
              const {
                color,
                background,
                name: themeName /** ThemeCtx */,
              } = themeVal;
              const { lang, name: langName /** LangCtx */ } = langVal;
              return (
                <div>
                  {JSON.stringify({
                    color,
                    background,
                    themeName,
                    lang,
                    langName,
                  })}
                </div>
              );
            }}
          </langCtx.Consumer>
        );
      }}
    </themeCtx.Consumer>
  );
};

export default function UseContextDemo4() {
  const [themeVal /** , setThemeVal */] = useState<IThemeCtx>({
    color: "lightblue",
    background: "lightgreen",
    name: "ThemeCtx",
  });
  const [langVal /** , setLangVal */] = useState<ILangCtx>({
    lang: "zhCN",
    name: "LangCtx",
  });
  return (
    <themeCtx.Provider value={themeVal}>
      <langCtx.Provider value={langVal}>
        <Child />
      </langCtx.Provider>
    </themeCtx.Provider>
  );
}
