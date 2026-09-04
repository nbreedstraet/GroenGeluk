import styles from "./cause.module.scss";

export default function Cause() {
  return (
    <div className={styles.alles}>
      <div className={styles.tekst}>
        <h3>Steun ons met een gift!</h3>
        <div className={styles.broodtekst}>
          <div className={styles.left}>
            Bij Groen Geluk is koken nooit een doel op zich, maar een krachtig
            middel om verandering in beweging te zetten. Elke maand zetten we de
            schouders onder één specifiek goed doel dat onze waarden deelt en
            keihard werkt aan een warmere, eerlijkere wereld. Dat doen we niet
            alleen door onze opbrengst te schenken. Bij elke editie zoeken we
            een actieve samenwerking op met de organisatie van die maand. Je
            vindt de mensen achter het goed doel dan ook gezellig bij ons op de
            vloer: ze koken mee in de keuken, helpen in de bediening of schuiven
            mee aan tafel.
          </div>
          <div className={styles.right}>
            Zo draag je door bij ons te komen eten niet alleen rechtstreeks bij
            aan hun organisatie, maar leer je het gezicht en het verhaal achter
            het initiatief ook een stukje beter kennen.
          </div>
        </div>
      </div>
    </div>
  );
}
