import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./news.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/Tekening-17.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-18.svg?raw";
import { vertaalVeld } from "../../lib/vertaal";

type NewsItem = {
  id: number;
  title: string;
  title_i18n: Record<string, string> | null;
  schrijver: string;
  content: string;
  content_i18n: Record<string, string> | null;
  category: string;
  category_i18n: Record<string, string> | null;
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

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function loadNews() {
      const { data, error } = await supabase
        .from("ImagesGoodCauses")
        .select("*")
        .order("createdAt", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        return;
      }

      setItems(
        (data ?? []).filter(
          (i) =>
            i.category !== "Recepten" &&
            !String(i.category).toLowerCase().startsWith("recepten"),
        ),
      );
    }

    loadNews();
  }, []);

  const categories = [
    ...new Map(
      items
        .filter((i) => i.category)
        .map((i) => [
          i.category,
          vertaalVeld(i.category_i18n, i18n.language) || i.category,
        ]),
    ),
  ];

  const filtered =
    filter === null ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <div className={styles.marges}>
        <PageBackground svgRaws={[svg1, svg2]} />
        {/* <PageBackground kader={"kader1"} /> */}
        <div className={styles.intro}>{t("news.intro")}</div>
        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${filter === null ? styles.active : ""}`}
            onClick={() => setFilter(null)}
          >
            {t("news.allCategories")}
          </button>

          {categories.map(([value, label]) => (
            <button
              key={value}
              className={`${styles.filterBtn} ${filter === value ? styles.active : ""}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.alles}>
          {filtered.map((item) => (
            <article
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/news/${item.id}`)}
            >
              <span className={styles.category}>
                {vertaalVeld(item.category_i18n, i18n.language) ||
                  item.category}
              </span>
              <h2>
                {vertaalVeld(item.title_i18n, i18n.language) || item.title}
              </h2>

              <p className={styles.author}>
                {t("news.by", { name: item.schrijver })}
              </p>

              <p className={styles.summary}>
                {summarize(
                  vertaalVeld(item.content_i18n, i18n.language) || item.content,
                )}
              </p>

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
