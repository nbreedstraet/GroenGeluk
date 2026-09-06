import { useTranslation } from "react-i18next";
import styles from "./support.module.scss";

export default function Support() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <div className={styles.tekst}>
        <h3>{t("support.title")}</h3>
        <div className={styles.broodtekst}>
          <div className={styles.left}>{t("support.left")}</div>
          <div className={styles.right}>{t("support.right")}</div>
        </div>
        <div className={styles.extraInfo}>
          <strong>{t("support.account")}</strong> {t("support.iban")} <br />
          <br /> <strong>{t("support.message")}</strong>{" "}
          {t("support.giftMessage")}
        </div>
      </div>
    </div>
  );
}