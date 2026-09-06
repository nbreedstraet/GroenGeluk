import { useTranslation } from "react-i18next";
import styles from "./about.module.scss";

export default function AboutMissie() {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t("about.tabMissie")}</h3>
      <div className={styles.broodtekst}>
        <div className={styles.left}>{t("about.missieLeft")}</div>
        <div className={styles.right}>{t("about.missieRight")}</div>
      </div>
    </>
  );
}