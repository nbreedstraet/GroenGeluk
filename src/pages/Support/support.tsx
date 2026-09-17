import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./support.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import TitleSvg from "../../components/titelSvg/titelSvg";
import svg1 from "../../assets/tekeningen/Tekening-55.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-56.svg?raw";

export default function Support() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      {/* <PageBackground kader={"kader2"} /> */}
      <PageBackground svgRaws={[svg1, svg2]} />
      <div className={styles.tekst}>
        <h3>
          <TitleSvg
            name="steun"
            label={t("gift.rekening")}
            width="clamp(350px, 20vw, 400px)"
          />
        </h3>
        <div className={styles.broodtekst}>
          <div className={styles.left}>{t("support.left")}</div>
          <div className={styles.right}>{t("support.right")}</div>
        </div>
        <div className={styles.extraInfo}>
          <TitleSvg
            name="rekening"
            label={t("gift.rekening")}
            width="clamp(230px, 15vw, 400px)"
          />
          {t("support.iban")} <br />
          <br />
          <TitleSvg
            name="mededeling"
            label={t("gift.rekening")}
            width="clamp(180px, 12vw, 400px)"
          />
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
