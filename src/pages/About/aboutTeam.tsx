import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./about.module.scss";

interface Member {
  id: number;
  fullName: string;
  favoriteVeganTip: string;
  role: string;
  contact: string;
}

export default function AboutTeam() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchMembers() {
      const { data } = await supabase
        .from("members")
        .select("*")
        .order("id", { ascending: true });

      setMembers(data ?? []);
      setLoading(false);
    }

    fetchMembers();
  }, []);

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
      <h3>{t("about.tabTeam")}</h3>
      <div className={styles.memberList}>
        {members.map((member, index) => (
          <div
            key={member.id}
            className={`${styles.memberCard} ${index % 2 === 0 ? styles.fotoFirst : styles.fotoLast}`}
          >
            <div className={styles.memberFoto} />
            <div className={styles.memberInfo}>
              <h4 className={styles.memberName}>{member.fullName}</h4>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberTip}>
                {t("about.teamTipLabel")} <br />
                {member.favoriteVeganTip}
              </p>
              <p className={styles.memberContact}>{member.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}