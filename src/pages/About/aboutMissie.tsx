import { useTranslation } from "react-i18next";
import styles from "./about.module.scss";
import TitleSvg from "../../components/titelSvg/titelSvg";

export default function AboutMissie() {
  const { t } = useTranslation();

  return (
    <>
      <h3>
        {" "}
        <TitleSvg
          name="missie"
          label={t("gift.rekening")}
          width="clamp(250px, 20vw, 400px)"
        />
      </h3>
      <div className={styles.broodtekst}>
        <div className={styles.left}>{t("about.missieLeft")}</div>
        <div className={styles.right}>{t("about.missieRight")}</div>
      </div>
    </>
  );
}
