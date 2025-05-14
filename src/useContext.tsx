import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";

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
  toggleTheme: () => {
    console.log(defaultTheme);
  },
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
