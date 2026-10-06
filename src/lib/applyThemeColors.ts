import { themes } from "../context/ThemeContext";

const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

export function applyThemeColors(html: string): string {
  let out = html;

  for (const { text, background } of Object.values(themes)) {
    const kleuren: Array<[string, string]> = [
      [text, "var(--text-color)"],
      [background, "var(--bg-color)"],
    ];

    for (const [kleur, cssVar] of kleuren) {
      out = out.replace(new RegExp(escapeRegExp(kleur), "gi"), cssVar);

      const [r, g, b] = hexToRgb(kleur);
      const rgb = `rgb\\(\\s*${r}\\s*,\\s*${g}\\s*,\\s*${b}\\s*(?:,\\s*[\\d.]+\\s*)?\\)`;
      out = out.replace(new RegExp(rgb, "gi"), cssVar);
    }
  }

  return out;
}
