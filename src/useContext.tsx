// import { useState, useContext, createContext, ReactNode } from "react";

// const ThemeContext = createContext({
//   theme: {
//     primaryColor: "#f5f7fa",
//     secondaryColor: "#ffffff",
//     backgroundColor: "#ffffff",
//     textColor: "#1e1e1e",
//   },
//   toggleTheme: () => {
//     console.log("Theme toggled!");
//   },
// });

// interface reactProps {
//   children: ReactNode;
// }
// export const ThemeProvider = ({ children }: reactProps) => {
//   const [theme, setTheme] = useState({
//     primaryColor: "#f5f7fa",
//     secondaryColor: "#ffffff",
//     backgroundColor: "#ffffff",
//     textColor: "#1e1e1e",
//   });

//   const toggleTheme = () => {
//     setTheme((prv) => ({
//       ...prv,
//       primaryColor: prv.primaryColor === "#f5f7fa" ? "black" : "#f5f7fa",
//       textColor: prv.textColor === "black" ? "#ccc" : "black",
//     }));
//     console.log("theme", theme.primaryColor);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";

// Define the type for your theme
interface ThemeType {
  mode: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
}

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const defaultTheme: ThemeType = {
  mode: "light",
  primaryColor: "#f5f7fa",
  secondaryColor: "#ffffff",
  backgroundColor: "#ffffff",
  textColor: "#1e1e1e",
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  toggleTheme: () => {},
});

interface ReactProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ReactProps) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    root.style.setProperty("--background-color", theme.backgroundColor);
    root.style.setProperty("--text-color", theme.textColor);
  }, [theme]);

  const toggleTheme = () => {
    const isLight = theme.mode === "light";
    const newTheme = isLight
      ? {
          mode: "dark",
          primaryColor: "#1e1e1e",
          secondaryColor: "#2c2c2c",
          backgroundColor: "#121212",
          textColor: "#f5f5f5",
        }
      : defaultTheme;

    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
