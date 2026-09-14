import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./support.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/Tekening-55.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-56.svg?raw";
import TitleSvg from "../../components/titelSvg/titelSvg";

export default function Support() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <PageBackground svgRaws={[svg1, svg2]} />
      <div className={styles.tekst}>
        <h3>
          <TitleSvg name="steun" label={t("gift.rekening")} width="25vw" />
        </h3>
        {/* <h3>{t("support.title")}</h3> */}
        <div className={styles.broodtekst}>
          <div className={styles.left}>{t("support.left")}</div>
          <div className={styles.right}>{t("support.right")}</div>
        </div>
        <div className={styles.extraInfo}>
          <TitleSvg name="rekening" label={t("gift.rekening")} width="15vw" />
          {/* <strong>{t("support.account")}</strong>  */}
          {t("support.iban")} <br />
          <br />
          <TitleSvg name="mededeling" label={t("gift.rekening")} width="10vw" />
          {/* <br /> <strong>{t("support.message")}</strong>{" "} */}
          {t("support.giftMessage")}
        </div>

        <div className={styles.crossLinks}>
          <Link to="/volunteers" className={styles.crossLink}>
            {t("support.crossVolunteers")}
          </Link>
          <Link to="/calendar" className={styles.crossLink}>
            {t("support.crossCalendar")}
          </Link>
          <Link to="/about" className={styles.crossLink}>
            {t("support.crossAbout")}
          </Link>
        </div>
      </div>
    </div>
  );
}
