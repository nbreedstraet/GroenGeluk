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

const Mail = ({ address }: { address: string }) => (
  <a href={`mailto:${address}`} className={styles.link}>
    {address}
  </a>
);

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

          <div className={styles.sectiontwo}>
            <h4 className={styles.heading}>{t("footer.info")}</h4>

            <div className={styles.sectiontwoColumns}>
              <div className={styles.secondsect}>
                <p className={styles.placeholder}>
                  {t("footer.infoPlaceholder")}
                </p>
                <p className={styles.placeholder}>
                  <a href="https://maps.app.goo.gl/FKUjVztLU93JEZwf9">
                    {t("footer.adresfirst")} <br /> {t("footer.adressecond")}
                  </a>
                </p>
                <p className={styles.placeholder}>{t("footer.rekening")}</p>
              </div>

              <div className={styles.secondsect}>
                <table className={styles.contactTable}>
                  <tbody>
                    <tr>
                      <td>Algemeen</td>
                      <td>
                        <Mail address="info@groengelukvzw.be" />
                      </td>
                    </tr>
                    <tr>
                      <td>Keuken</td>
                      <td>
                        <Mail address="ferrethomas@groengelukvzw.be" />
                        <br />
                        <Mail address="robinwarrinnier@groengelukvzw.be" />
                        <br />
                        <Mail address="franmondelaers@groengelukvzw.be" />
                        <br />
                        <Mail address="sienbosmans@groengelukvzw.be" />
                      </td>
                    </tr>
                    <tr>
                      <td>Communicatie</td>
                      <td>
                        <Mail address="chloevanuytven@groengelukvzw.be" />
                        <br />
                        <Mail address="mirtefannes@groengelukvzw.be" />
                        <br />
                        <Mail address="ninabreedstraet@groengelukvzw.be" />
                      </td>
                    </tr>
                    <tr>
                      <td>Vrijwilligerscoördinatie</td>
                      <td>
                        <Mail address="lenaverschraegen@groengelukvzw.be" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
