import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./cause.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/tekening-64.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening.svg?raw";

export default function Cause() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <PageBackground svgRaws={[svg1, svg2]} />
      {/* <PageBackground kader={"kader1"} /> */}
      <div className={styles.tekst}>
        <h3>{t("cause.title")}</h3>
        <div className={styles.broodtekst}>
          <div className={styles.left}>{t("cause.left")}</div>
          <div className={styles.right}>{t("cause.right")}</div>
        </div>
      </div>
      <div className={styles.tekst2}>
        <h3>{t("cause.featuredTitle")}</h3>
        <img src="/Images/FotoCC.webp" alt="" className={styles.img3} />
        <div className={styles.broodtekst}>
          <div className={styles.left}>{t("cause.featuredLeft")}</div>
          <div className={styles.right}>
            {t("cause.featuredRight1")}{" "}
            <a href="https://www.compagniecordial.be/">
              {t("cause.featuredRightWebsite")}
            </a>
            .
            <br />
            <br />
            <i>{t("cause.featuredRight2")}</i>
          </div>
        </div>
      </div>

      <div className={styles.crossLinks}>
        <Link to="/calendar" className={styles.crossLink}>
          {t("cause.crossCalendar")}
        </Link>
        <Link to="/about" className={styles.crossLink}>
          {t("cause.crossAbout")}
        </Link>
        <Link to="/support" className={styles.crossLink}>
          {t("cause.crossSupport")}
        </Link>
      </div>
    </div>
  );
}
