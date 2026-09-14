import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./volunteers.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/Tekening-57.svg?raw";
import svg2 from "../../assets/tekeningen/tekening-63.svg?raw";
import TitleSvg from "../../components/titelSvg/titelSvg";

export default function Volunteer() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <PageBackground svgRaws={[svg1, svg2]} />
      <div className={styles.tekst}>
        <h3>
          <TitleSvg name="help" label={t("gift.rekening")} width="25vw" />
        </h3>
        <div className={styles.broodtekst}>
          <div className={styles.left}>{t("volunteers.left")}</div>
          <div className={styles.right}>
            {t("volunteers.right")}
            <br /> <br />
          </div>
        </div>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdh1eRpncD8yXXUvSfvOJ-89plEeaa_XSNA2vjL1U2LA9rS2g/viewform">
          {t("volunteers.cta")}
        </a>

        <div className={styles.crossLinks}>
          <Link to="/about" className={styles.crossLink}>
            {t("volunteers.crossAbout")}
          </Link>
          <Link to="/support" className={styles.crossLink}>
            {t("volunteers.crossSupport")}
          </Link>
          <Link to="/calendar" className={styles.crossLink}>
            {t("volunteers.crossCalendar")}
          </Link>
        </div>
      </div>
    </div>
  );
}
