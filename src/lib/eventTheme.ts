import type { Theme } from "../context/ThemeContext";

const BLUE_WORDS = ["lange tafel", "tafel", "long table", "table", "tisch"];
const RED_WORDS = ["diner", "dîner", "dinner", "abendessen"];

export function themeForEventType(
  type?: string | null,
  label?: string | null,
): Theme {
  const tekst = `${type ?? ""} ${label ?? ""}`.toLowerCase();

  if (RED_WORDS.some((woord) => tekst.includes(woord))) return "red";
  if (BLUE_WORDS.some((woord) => tekst.includes(woord))) return "blue";
  return "green";
}
