import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./about.module.scss";
import AboutWatWedoen from "./aboutWatwedoen";
import AboutTeam from "./aboutTeam";
import AboutMissie from "./aboutMissie";

type Tab = "overons" | "team" | "missie";

export default function About() {
  const [tab, setTab] = useState<Tab>("overons");
  const { t } = useTranslation();

  return (
    <div className={styles.alles}>
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
      </div>
    </div>
  );
}