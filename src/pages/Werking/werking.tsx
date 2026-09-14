import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./werking.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/Tekening-21.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-53.svg?raw";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <PageBackground svgRaws={[svg1, svg2]} />
      <div className={styles.tekst}>
        <p>{t("werking.intro")}</p>
        <strong>{t("werking.tafelTitle")}</strong>
        <p>
          {t("werking.tafelText1")}
          <br />
          <br />
          {t("werking.tafelText2")}
          <br />
          <br />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.137136944102!2d4.710454176451654!3d50.884172156040684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c1614830f163f3%3A0x9d4050ebd887edb3!2sStelplaats!5e0!3m2!1snl!2sbe!4v1789388568395!5m2!1snl!2sbe"
            width="100%"
            height="250"
            loading="lazy"
          ></iframe>

          {/* {t("werking.stelplaats")} */}
        </p>
        <br />
        <br />
        <strong>{t("werking.dinerTitle")}</strong>
        <p>
          {t("werking.dinerText1")}
          <br /> <br />{" "}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.004446737814!2d4.702560876451773!3d50.88662805586272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c161f6e32aedf7%3A0x1cbe515871a10286!2smaakleerplek!5e0!3m2!1snl!2sbe!4v1789388606549!5m2!1snl!2sbe"
            width="100%"
            height="250"
            loading="lazy"
          ></iframe>
          {/* {t("werking.dinerText2")} */}
        </p>
        <br />
        <br />
        <strong>{t("werking.workshopsTitle")}</strong>
        <p>
          {t("werking.workshopsText1")}
          <br />
          <br />
          {t("werking.workshopsText2")}
          <br />
          <br />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.004446737814!2d4.702560876451773!3d50.88662805586272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c161f6e32aedf7%3A0x1cbe515871a10286!2smaakleerplek!5e0!3m2!1snl!2sbe!4v1789388606549!5m2!1snl!2sbe"
            width="100%"
            height="250"
            loading="lazy"
          ></iframe>
        </p>

        <div className={styles.crossLinks}>
          <Link to="/calendar" className={styles.crossLink}>
            {t("werking.crossCalendar")}
          </Link>
          <Link to="/support" className={styles.crossLink}>
            {t("werking.crossSupport")}
          </Link>
          <Link to="/volunteers" className={styles.crossLink}>
            {t("werking.crossVolunteers")}
          </Link>
        </div>
      </div>
    </div>
  );
}
