import { useTranslation } from "react-i18next";
import styles from "./volunteers.module.scss";

export default function Volunteer() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <div className={styles.tekst}>
        <h3>{t("volunteers.title")}</h3>
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
      </div>
    </div>
  );
}