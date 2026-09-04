import { useTranslation } from "react-i18next";
import styles from "./support.module.scss";

export default function Gift() {
  const { t } = useTranslation();

  return (
    <>
      <h3>Steun ons met een gift!</h3>
      <div className={styles.broodtekst}>
        <div className={styles.left}>
          We stoppen al onze tijd, liefde en energie in het koken voor onze
          maandelijkse goede doelen. Groen Geluk draait daarbij volledig op
          vrijwillige inzet: ook ons vaste team wordt niet vergoed. Om dit alles
          te kunnen blijven doen en onze edities en workshops toegankelijk te
          houden, heeft onze eigen werking af en toe ook wat extra ademruimte
          nodig.
        </div>
        <div className={styles.right}>
          Wil je ons helpen om de vaste kosten te dekken, keukenmateriaal te
          vernieuwen of simpelweg ons concept te laten groeien? Dan kan je ons
          enorm vooruithelpen met een vrije gift. Elk bedrag, groot of klein,
          vloeit rechtstreeks terug in de algemene werking van Groen Geluk,
          zodat wij met evenveel enthousiasme kunnen blijven koken voor een
          betere wereld. Dikke merci voor jouw steun!
        </div>
      </div>
      <div className={styles.extraInfo}>
        <strong>Rekeningnummer:</strong> BE67 7310 6463 2687 <br />
        <br /> <strong>Mededeling:</strong> Vrije gift Groen Geluk
      </div>
    </>
  );
}
