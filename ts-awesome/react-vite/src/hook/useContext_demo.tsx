import { createContext, useContext, useState } from "react";

interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext({} as IThemeContext /* defaultValue */);

function Child() {
  const theme = useContext(ThemeContext);
  console.log("Child:", theme);
  return <div>Child</div>;
}

function Parent() {
  const theme = useContext(ThemeContext);
  console.log("Parent:", theme);
  return (
    <>
      <div>Parent</div>
      <Child />
    </>
  );
}

export function UseContextDemo() {
  const [theme, setTheme] = useState("light");
  return (
    <div>
      <div>Grandparent</div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Parent />
      </ThemeContext.Provider>
    </div>
  );
}
