import { useState } from "react";
import styles from "./navigations.module.scss";
import { Link } from "react-router-dom";
import { useTheme, themes } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/languageSwitcher";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const themeImages: Record<string, string> = {
    green: "/Images/HorizontalLogo-69.svg",
    blue: "/Images/HorizontalLogo-70.svg",
    red: "/Images/HorizontalLogo-68.svg",
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
      </div>

      <div
        className={`${styles.midden} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        style={{ zIndex: 999 }}
      >
        <Link to="/Home" onClick={() => setIsMenuOpen(false)}>
          <img src={themeImages[theme]} alt="Thema" className={styles.image} />
        </Link>
        {/* <Link to="/about" onClick={() => setIsMenuOpen(false)}>
          {t("nav.about")}
        </Link>
        <Link to="/news" onClick={() => setIsMenuOpen(false)}>
          {t("nav.news")}
        </Link>
        <Link to="/calendar" onClick={() => setIsMenuOpen(false)}>
          {t("nav.calendar")}
        </Link>
        <Link to="/werking" onClick={() => setIsMenuOpen(false)}>
          {t("nav.werking")}
        </Link>
        <Link to="/volunteers" onClick={() => setIsMenuOpen(false)}>
          {t("nav.volunteers")}
        </Link>
        <Link to="/support" onClick={() => setIsMenuOpen(false)}>
          {t("nav.support")}
        </Link> */}
      </div>

      <div className={styles.topRight}>
        <div className={styles.languageButtons}>
          <LanguageSwitcher />
        </div>
        <div className={styles.themeButtons}>
          <button
            className={`${styles.themeBtn} ${theme === "green" ? styles.active : ""}`}
            onClick={() => setTheme("green")}
            style={{
              backgroundColor: themes.green.text,
              color: themes.green.background,
            }}
            title={t("nav.themeGreen")}
          />
          <button
            className={`${styles.themeBtn} ${theme === "blue" ? styles.active : ""}`}
            onClick={() => setTheme("blue")}
            style={{
              backgroundColor: themes.blue.text,
              color: themes.blue.background,
            }}
            title={t("nav.themeBlue")}
          />
          <button
            className={`${styles.themeBtn} ${theme === "red" ? styles.active : ""}`}
            onClick={() => setTheme("red")}
            style={{
              backgroundColor: themes.red.text,
              color: themes.red.background,
            }}
            title={t("nav.themeRed")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
