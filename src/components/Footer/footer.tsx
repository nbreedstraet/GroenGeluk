import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./footer.module.scss";

const footerLinks = [
  { key: "nav.home", to: "/home" },
  { key: "nav.about", to: "/about" },
  { key: "nav.news", to: "/news" },
  { key: "nav.keuken", to: "/keuken" },
  { key: "nav.calendar", to: "/calendar" },
  { key: "nav.contact", to: "/werking" },
  { key: "nav.volunteers", to: "/volunteers" },
  { key: "nav.support", to: "/support" },
  { key: "nav.cause", to: "/cause" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.sections}>
          <div className={styles.section}>
            <h4 className={styles.heading}>{t("footer.sitemap")}</h4>
            <ul className={styles.linkList}>
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.heading}>{t("footer.info")}</h4>
            <p className={styles.placeholder}>{t("footer.infoPlaceholder")}</p>
            <p className={styles.placeholder}>
              {t("footer.adresfirst")} <br /> {t("footer.adressecond")}
            </p>
            <p className={styles.placeholder}>{t("footer.mail")}</p>
            <p className={styles.placeholder}>{t("footer.rekening")}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
