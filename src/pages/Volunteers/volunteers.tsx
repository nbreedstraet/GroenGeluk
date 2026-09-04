import styles from "./volunteers.module.scss";

export default function Volunteer() {
  return (
    <div className={styles.alles}>
      <div className={styles.tekst}>
        <h3>Help als vrijwilliger!</h3>
        <div className={styles.broodtekst}>
          <div className={styles.left}>
            Groen Geluk wil gezonde, duurzame voeding toegankelijk maken voor
            iedereen. We organiseren solidaire diners en workshops die mensen
            uit alle lagen van de samenleving verbinden, sensibiliseren en
            inspireren. Door samen te werken met lokale boeren en organisaties
            versterken en promoten we de korte keten, ondersteunen we sociale en
            ecologische initiatieven en tonen we dat plantaardig eten eenvoudig,
            betaalbaar en lekker kan zijn.
          </div>
          <div className={styles.right}>
            Wij dromen van een samenleving waarin voeding niet alleen gezond en
            duurzaam is, maar ook een bron van solidariteit en verbinding. Groen
            Geluk wil een katalysator zijn voor verandering: een organisatie die
            boer en burger dichter bij elkaar brengt, kwaliteitsvolle
            seizoensgebonden maaltijden aanbiedt aan iedereen, ongeacht
            financiële mogelijkheden, en bewustwording rond de rol van voeding
            in een meer rechtvaardige en ecologisch verantwoorde wereld
            stimuleert.
          </div>
        </div>
      </div>
    </div>
  );
}
