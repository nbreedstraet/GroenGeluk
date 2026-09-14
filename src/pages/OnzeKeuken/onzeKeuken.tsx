import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./onzeKeuken.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/Tekening-17.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-18.svg?raw";

type NewsItem = {
  id: number;
  title: string;
  schrijver: string;
  content: string;
  category: string;
  createdAt: string;
};

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function summarize(text: string, maxLen = 200): string {
  const clean = stripHtml(text);
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trimEnd() + "…";
}

export default function OnzeKeuken() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function loadRecipes() {
      const { data, error } = await supabase
        .from("ImagesGoodCauses")
        .select("*")
        .eq("category", "Recepten")
        .order("createdAt", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        return;
      }

      setItems(data ?? []);
    }

    loadRecipes();
  }, []);

  return (
    <>
      <div className={styles.marges}>
        <PageBackground svgRaws={[svg1, svg2]} />
        <div className={styles.intro}>{t("keuken.intro")}</div>

        <div className={styles.alles}>
          {items.map((item) => (
            <article
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/news/${item.id}`)}
            >
              <span className={styles.category}>{item.category}</span>

              <h2>{item.title}</h2>

              <p className={styles.author}>
                {t("news.by", { name: item.schrijver })}
              </p>

              <p className={styles.summary}>{summarize(item.content)}</p>

              <span className={styles.readMore}>{t("news.readMore")}</span>
            </article>
          ))}
        </div>

        <div className={styles.crossLinks}>
          <Link to="/calendar" className={styles.crossLink}>
            {t("news.crossCalendar")}
          </Link>
          <Link to="/about" className={styles.crossLink}>
            {t("news.crossAbout")}
          </Link>
        </div>
      </div>
    </>
  );
}