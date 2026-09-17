import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTheme, themes } from "../../context/ThemeContext";
import styles from "./titelSvg.module.scss";

const svgs = import.meta.glob("../../assets/titles/**/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function sanitizeSvg(svg: string, color: string): string {
  let html = svg;

  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  html = html.replace(/style="([^"]*)"/gi, (_, styleContent) => {
    const cleaned = styleContent.replace(/fill\s*:\s*[^;"]+;?/gi, "").trim();
    return cleaned ? `style="${cleaned}"` : "";
  });

  html = html.replace(/\sfill="(?!none)[^"]*"/gi, "");

  html = html.replace(/\s(width|height)="[^"]*"/g, "");
  html = html.replace(/<svg\b/, '<svg width="100%" height="auto"');
  html = html.replace(/<svg\b/, '<svg overflow="visible"');

  html = html.replace(
    "</svg>",
    `<style>path, polygon, rect, circle, ellipse, line, polyline { fill: ${color}; stroke: none; }</style></svg>`,
  );

  return html;
}

function resolveSvg(name: string, lang: string, fallbackLang = "nl") {
  const tryLang = (l: string) =>
    Object.entries(svgs).find(([path]) =>
      path.endsWith(`/titles/${l}/${name}.svg`),
    )?.[1];

  return tryLang(lang) ?? tryLang(fallbackLang);
}

type Props = {
  name: string;
  label: string;
  className?: string;
  width?: string | number;
};

export default function TitleSvg({ name, label, className, width }: Props) {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const color = themes[theme].text;

  const raw = resolveSvg(name, i18n.language);
  const markup = useMemo(
    () => (raw ? sanitizeSvg(raw, color) : undefined),
    [raw, color],
  );

  if (!markup) return null;

  return (
    <span
      role="img"
      aria-label={label}
      className={`${styles.titleSvg} ${className ?? ""}`}
      style={width ? { width } : undefined}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
