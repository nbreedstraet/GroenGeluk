import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./about.module.scss";
import TitleSvg from "../../components/titelSvg/titelSvg";
import { vertaalVeld } from "../../lib/vertaal";

type I18n = Record<string, string> | null;

interface Member {
  id: number;
  fullName: string;
  favoriteVeganTip: string;
  favoriteVeganTip_i18n: I18n;
  role: string;
  role_i18n: I18n;
  contact: string;
}

export default function AboutTeam() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchMembers() {
      const { data } = await supabase
        .from("members")
        .select("*")
        .order("fullName", { ascending: true });

      setMembers(data ?? []);
      setLoading(false);
    }

    fetchMembers();
  }, []);

  const tr = (i18nVeld: I18n, origineel: string) =>
    vertaalVeld(i18nVeld, i18n.language) || origineel;

  if (loading) {
    return (
      <div className={styles.teamContent}>
        <h3>{t("about.tabTeam")}</h3>
        <p className={styles.teamText}>{t("about.teamLoading")}</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className={styles.teamContent}>
        <h3>{t("about.tabTeam")}</h3>
        <p className={styles.teamText}>{t("about.teamEmpty")}</p>
      </div>
    );
  }

  return (
    <div className={styles.teamContent}>
      <h3>
        <TitleSvg
          name="team"
          label={t("gift.rekening")}
          width="clamp(100px, 5vw, 200px)"
        />
      </h3>
      <div className={styles.memberList}>
        {members.map((member, index) => (
          <div
            key={member.id}
            className={`${styles.memberCard} ${index % 2 === 0 ? styles.fotoFirst : styles.fotoLast}`}
          >
            <div className={styles.memberFoto} />
            <div className={styles.memberInfo}>
              <h4 className={styles.memberName}>{member.fullName}</h4>
              <p className={styles.memberRole}>
                {tr(member.role_i18n, member.role)}
              </p>
              <p className={styles.memberTip}>
                {t("about.teamTipLabel")} <br />
                {tr(member.favoriteVeganTip_i18n, member.favoriteVeganTip)}
              </p>
              <p className={styles.memberContact}>{member.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
