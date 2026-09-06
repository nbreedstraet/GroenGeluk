import { useState } from "react";
import styles from "./navigations.module.scss";
import { Link } from "react-router-dom";
import { useTheme, themes } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/languageSwitcher";

const navItems = [
  { key: "nav.home", to: "/home" },
  { key: "nav.about", to: "/about" },
  { key: "nav.news", to: "/news" },
  { key: "nav.calendar", to: "/calendar" },
  { key: "nav.contact", to: "/werking" },
  { key: "nav.volunteers", to: "/volunteers" },
  { key: "nav.support", to: "/support" },
  { key: "nav.cause", to: "/cause" },
];

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

  const themeButtons = (
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
  );

  return (
    <nav className={styles.nav}>
      <Link
        to="/home"
        className={styles.mobileLogo}
        onClick={() => setIsMenuOpen(false)}
      >
        <img src={themeImages[theme]} alt="Thema" className={styles.image} />
      </Link>

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
        <Link
          to="/home"
          className={styles.navLogo}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={themeImages[theme]} alt="Thema" className={styles.image} />
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            {t(item.key)}
          </Link>
        ))}
        <div className={styles.mobileMenuBottom}>
          <div className={styles.languageButtons}>
            <LanguageSwitcher />
          </div>
          {themeButtons}
        </div>
      </div>

      <div
        className={`${styles.desktopMenu} ${
          isMenuOpen ? styles.desktopMenuOpen : ""
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={styles.desktopMenuLink}
            onClick={() => setIsMenuOpen(false)}
          >
            {t(item.key)}
          </Link>
        ))}
      </div>

      <div className={styles.topRight}>
        <div className={styles.languageButtons}>
          <LanguageSwitcher />
        </div>
        {themeButtons}
      </div>
    </nav>
  );
};

export default Navigation;
