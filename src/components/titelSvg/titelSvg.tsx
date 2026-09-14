import { useTranslation } from "react-i18next";
import styles from "./titelSvg.module.scss";

const svgs = import.meta.glob("../../assets/titles/**/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function sanitizeSvg(markup: string) {
  return markup
    .replace(
      /<svg([^>]*)>/,
      (_, attrs) =>
        `<svg ${attrs.replace(/\s*(width|height)="[^"]*"/g, "").trim()} fill="currentColor">`,
    )
    .replace(/\sfill="(?!none)[^"]*"/g, "");
}

function resolveSvg(name: string, lang: string, fallbackLang = "nl") {
  const tryLang = (l: string) =>
    Object.entries(svgs).find(([path]) =>
      path.endsWith(`/titles/${l}/${name}.svg`),
    )?.[1];

  const raw = tryLang(lang) ?? tryLang(fallbackLang);
  return raw ? sanitizeSvg(raw) : undefined;
}

type Props = {
  name: string;
  label: string;
  className?: string;
  width?: string | number;
};

export default function TitleSvg({ name, label, className, width }: Props) {
  const { i18n } = useTranslation();
  const markup = resolveSvg(name, i18n.language);

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
