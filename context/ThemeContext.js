import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false); // default = light mode

  const toggleTheme = () => setDarkMode(prev => !prev);

  const theme = darkMode
    ? {
        background: "#121212",
        card: "#1E1E1E",
        text: "#FFFFFF",
        subText: "#BBBBBB",
      }
    : {
        background: "#F6F9FC",
        card: "#FFFFFF",
        text: "#234C6A",
        subText: "#777",
      };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
