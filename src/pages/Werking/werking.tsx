import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import styles from "./werking.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/Tekening-21.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-53.svg?raw";
import TitleSvg from "../../components/titelSvg/titelSvg";
import { useTheme } from "../../context/ThemeContext";

export default function Contact() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const baseTheme = useRef(theme);

  useEffect(() => {
    return () => {
      setTheme(baseTheme.current);
    };
  }, []);

  const handleEnter = (hoverTheme: "green" | "blue" | "red") => {
    setTheme(hoverTheme);
  };

  const handleLeave = () => {
    setTheme(baseTheme.current);
  };

  return (
    <div className={styles.alles}>
      <PageBackground svgRaws={[svg1, svg2]} />
      {/* <PageBackground kader={"kader1"} height="490vh" marginTop="-120vh" /> */}
      <div className={styles.tekst}>
        <p>{t("werking.intro")}</p>

        <div
          className={styles.longtable}
          onMouseEnter={() => handleEnter("blue")}
          onMouseLeave={handleLeave}
        >
          <TitleSvg
            name="longtable"
            label={t("gift.rekening")}
            width="clamp(300px, 5vw, 80px)"
          />
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
          </p>
          <br />
          <br />
        </div>

        <div
          className={styles.dining}
          onMouseEnter={() => handleEnter("red")}
          onMouseLeave={handleLeave}
        >
          <strong>
            <TitleSvg
              name="dining"
              label={t("gift.rekening")}
              width="clamp(300px, 5vw, 80px)"
            />
          </strong>
          <p>
            {t("werking.dinerText1")}
            <br /> <br />{" "}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.004446737814!2d4.702560876451773!3d50.88662805586272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c161f6e32aedf7%3A0x1cbe515871a10286!2smaakleerplek!5e0!3m2!1snl!2sbe!4v1789388606549!5m2!1snl!2sbe"
              width="100%"
              height="250"
              loading="lazy"
            ></iframe>
          </p>
        </div>
        <br />
        <br />

        <div
          className={styles.workshops}
          onMouseEnter={() => handleEnter("green")}
          onMouseLeave={handleLeave}
        >
          <strong>
            <TitleSvg
              name="workshops"
              label={t("gift.rekening")}
              width="clamp(300px, 5vw, 80px)"
            />
          </strong>
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
        </div>

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
