import { useTranslation } from "react-i18next";
import styles from "./cause.module.scss";

export default function Cause() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
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
    </div>
  );
}