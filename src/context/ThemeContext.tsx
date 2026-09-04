import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "green" | "blue" | "red";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: Record<Theme, { text: string; background: string }> = {
  green: { text: "#006837", background: "#f5ead2" },
  blue: { text: "#00426e", background: "#ffe4ca" },
  red: { text: "#ca1f00", background: "#ffffcc" },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("green");

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.style.setProperty(
      "--text-color",
      themes[newTheme].text,
    );
    document.documentElement.style.setProperty(
      "--bg-color",
      themes[newTheme].background,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
