import { useTranslation } from "react-i18next";
import styles from "./home.module.scss";
import TekeningCollage from "../../components/TekeningCollage/tekeningCollage";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <div className={styles.basis}>
        <div className={styles.collageOverlay}>
          <div className={styles.intro}>
            <p>
              Welkom bij Groen Geluk vzw! Of je ons nu al een tijdje kent of ons
              pas ontdekt, heel welkom. Familie, student, vriendengroep of in je
              eentje, jong of oud, iedereen is hier thuis.
            </p>
            <p>
              Schuif gerust mee aan tafel en ontdek hoe we met eerlijke,
              plantaardige gerechten de wereld een klein beetje mooier proberen
              te maken.Merci om hier te zijn.
            </p>
          </div>
          <TekeningCollage />
        </div>
      </div>
    </div>
  );
}
