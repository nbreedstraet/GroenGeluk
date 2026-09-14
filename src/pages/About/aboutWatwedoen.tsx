import { useTranslation } from "react-i18next";
import styles from "./about.module.scss";
import TitleSvg from "../../components/titelSvg/titelSvg";

export default function AboutWatWedoen() {
  const { t } = useTranslation();

  return (
    <>
      <h3>
        <TitleSvg name="about" label={t("gift.rekening")} width="20vw" />
      </h3>
      <div className={styles.broodtekst}>
        <div className={styles.left}>
          {t("about.watWedoenLeft1")}
          <br />
          <br />
          <i>{t("about.watWedoenLeft2")}</i>
        </div>
        <div className={styles.right}>{t("about.watWedoenRight")}</div>
      </div>
    </>
  );
}
