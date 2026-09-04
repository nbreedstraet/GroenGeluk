import { useTranslation } from "react-i18next";
import styles from "./home.module.scss";
import TekeningCollage from "../../components/TekeningCollage/tekeningCollage";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <div className={styles.basis}>
        <div className={styles.intro}>
          <p>
            Welkom bij Groen Geluk vzw! Of je ons nu al een tijdje kent of ons
            pas ontdekt, heel welkom. Familie, student, vriendengroep of in je
            eentje, jong of oud, iedereen is hier thuis. Schuif gerust mee aan
            tafel en ontdek hoe we met eerlijke, plantaardige gerechten de
            wereld een klein beetje mooier proberen te maken. <br />
            <br />
            Klik op de tekeningen hieronder om ons verhaal, onze projecten en
            onze missie beter te leren kennen. Merci om hier te zijn.
          </p>
        </div>
        <div className={styles.collageOverlay}>
          <TekeningCollage />
        </div>
      </div>

      <div className={styles.containerfooter}>
        <a
          href="https://l.oveit.com/events/embed?id=35cc9b8e38&theme=light&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnsfy3ZuPch-MCEu5gGkEKAkaO1ZUFS5Io7ro7h5HMoq9Iqvo7jj2L8Nbg38EaEM_ZRb602NbafdaQl8VqfumKg"
          className={styles.button}
        >
          {t("home.tickets")}
        </a>
      </div>
    </div>
  );
}
