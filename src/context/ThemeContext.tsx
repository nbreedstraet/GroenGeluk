import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Theme = "green" | "blue" | "red";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  previewTheme: (theme: Theme) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: Record<Theme, { text: string; background: string }> = {
  green: { text: "#006837", background: "#f5ead2" },
  blue: { text: "#00426e", background: "#ffe4ca" },
  red: { text: "#ca1f00", background: "#ffffcc" },
};

const favicons: Record<Theme, string> = {
  green: "/Images/LogoSVGSmall.svg",
  blue: "/Images/LogoSVGSmall-blauw.svg",
  red: "/Images/LogoSVGSmall-rood.svg",
};

const applyFavicon = (next: Theme) => {
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (link) link.href = favicons[next];
};

const applyTheme = (next: Theme) => {
  document.documentElement.style.setProperty("--text-color", themes[next].text);
  document.documentElement.style.setProperty("--bg-color", themes[next].background);
  applyFavicon(next);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("green");
  const baseTheme = useRef<Theme>("green");

  const setTheme = useCallback((next: Theme) => {
    baseTheme.current = next;
    setThemeState(next);
    applyTheme(next);
  }, []);

  const previewTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
  }, []);

  const resetTheme = useCallback(() => {
    setThemeState(baseTheme.current);
    applyTheme(baseTheme.current);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, previewTheme, resetTheme }}>
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
