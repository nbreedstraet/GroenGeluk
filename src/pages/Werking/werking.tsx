import { useTranslation } from "react-i18next";
import styles from "./werking.module.scss";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <div className={styles.tekst}>
        <p>{t("werking.intro")}</p>
        <strong>{t("werking.tafelTitle")}</strong>
        <p>
          {t("werking.tafelText1")}
          <br />
          <br />
          {t("werking.tafelText2")}
          <br />
          <br />
          {t("werking.stelplaats")}
        </p>
        <br />
        <br />
        <strong>{t("werking.dinerTitle")}</strong>
        <p>
          {t("werking.dinerText1")}
          <br /> <br />
          {t("werking.dinerText2")}
        </p>
        <br />
        <br />
        <strong>{t("werking.workshopsTitle")}</strong>
        <p>
          {t("werking.workshopsText1")}
          <br />
          <br />
          {t("werking.workshopsText2")}
        </p>
      </div>
    </div>
  );
}