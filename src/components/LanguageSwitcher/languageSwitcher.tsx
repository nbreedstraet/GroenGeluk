import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "./languageSwitcher.module.scss";

const languages = [
  { code: "nl" as const, label: "Nederlands" },
  { code: "en" as const, label: "English" },
  { code: "fr" as const, label: "Français" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const current = languages.find((l) => l.code === language) ?? languages[0];

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      >
        {current.label}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.option} ${lang.code === language ? styles.active : ""}`}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
