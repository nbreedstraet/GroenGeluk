import { useTranslation } from "react-i18next";
import styles from "./about.module.scss";

export default function AboutWatWedoen() {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t("about.title")}</h3>
      <div className={styles.broodtekst}>
        <div className={styles.left}>
          Groen Geluk startte enkele jaren geleden in Leuven vanuit een gedeelde
          droom om mensen samen te brengen rond lekker, plantaardig eten. Wat
          begon vanuit een gezamenlijke passie is inmiddels uitgegroeid tot een
          hecht en gedreven team dat op regelmatige basis diners, lange tafels
          en workshops organiseert. Solidair, seizoensgebonden, smakelijk.
        </div>
        <div className={styles.right}>
          Sinds 2026 zijn we officieel Groen Geluk vzw, op papier net dat
          tikkeltje anders maar wij zijn gewoon onze gezellige bende gebleven.
          Wij geloven allemaal dat de rijkste gesprekken en de schoonste
          verbindingen ontstaan wanneer we samen aanschuiven aan een tafel vol
          kleurrijke bordjes. Met onze werking willen we op een positieve manier
          dingen in beweging zetten. We werken met drie concepten waarbinnen we
          diners, lange tafels en workshops organiseren. De opbrengst van deze
          edities gaat elke maand naar een ander goed doel dat zich inzet voor
          mens en planeet.
        </div>
      </div>
    </>
  );
}
