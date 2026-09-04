import { useState } from "react";
import styles from "./about.module.scss";
import AboutWatWedoen from "./aboutWatwedoen";
import AboutTeam from "./aboutTeam";
import AboutMissie from "./aboutMissie";

type Tab = "overons" | "team" | "missie";

export default function About() {
  const [tab, setTab] = useState<Tab>("overons");

  return (
    <div className={styles.alles}>
      <div className={styles.tekst}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${tab === "overons" ? styles.tabActive : ""}`}
            onClick={() => setTab("overons")}
          >
            Over Groen Geluk
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === "missie" ? styles.tabActive : ""}`}
            onClick={() => setTab("missie")}
          >
            Onze missie en visie
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === "team" ? styles.tabActive : ""}`}
            onClick={() => setTab("team")}
          >
            Team
          </button>
        </div>

        {tab === "overons" && <AboutWatWedoen />}
        {tab === "team" && <AboutTeam />}
        {tab === "missie" && <AboutMissie />}
      </div>
    </div>
  );
}
