import { useTranslation } from "react-i18next";
import styles from "./home.module.scss";
import TekeningCollage from "../../components/TekeningCollage/tekeningCollage";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <div className={styles.basis}>
        <div className={styles.collageOverlay}>
          <TekeningCollage
            intro={
              <div className={styles.intro}>
                <p>
                  {t("home.intro1")}
                  <br />
                  <br />
                  {t("home.intro2")}
                </p>
                <p></p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}