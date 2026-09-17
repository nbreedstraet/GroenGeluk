import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./about.module.scss";
import AboutWatWedoen from "./aboutWatwedoen";
import AboutTeam from "./aboutTeam";
import AboutMissie from "./aboutMissie";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/Tekening-15.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-16.svg?raw";

type Tab = "overons" | "team" | "missie";

export default function About() {
  const [tab, setTab] = useState<Tab>("overons");
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
      <PageBackground svgRaws={[svg1, svg2]} />
      {/* <PageBackground kader={"kader2"} height="950px" marginTop="0rem" /> */}
      <div className={styles.tekst}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${tab === "overons" ? styles.tabActive : ""}`}
            onClick={() => setTab("overons")}
          >
            {t("about.tabOverons")}
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === "missie" ? styles.tabActive : ""}`}
            onClick={() => setTab("missie")}
          >
            {t("about.tabMissie")}
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === "team" ? styles.tabActive : ""}`}
            onClick={() => setTab("team")}
          >
            {t("about.tabTeam")}
          </button>
        </div>

        {tab === "overons" && <AboutWatWedoen />}
        {tab === "team" && <AboutTeam />}
        {tab === "missie" && <AboutMissie />}

        <div className={styles.crossLinks}>
          <Link to="/calendar" className={styles.crossLink}>
            {t("about.crossCalendar")}
          </Link>
          <Link to="/support" className={styles.crossLink}>
            {t("about.crossSupport")}
          </Link>
          <Link to="/volunteers" className={styles.crossLink}>
            {t("about.crossVolunteers")}
          </Link>
        </div>
      </div>
    </div>
  );
}
