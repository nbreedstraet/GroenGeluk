import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./news.module.scss";

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

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState("Alle");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const allCategories = t("news.allCategories");

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

      setItems(data ?? []);
    }

    loadNews();
  }, []);

  const categories = [
    allCategories,
    ...new Set(items.map((i) => i.category).filter(Boolean)),
  ];

  const filtered =
    filter === allCategories
      ? items
      : items.filter((i) => i.category === filter);

  return (
    <>
      <div className={styles.marges}>
        <div className={styles.intro}>{t("news.intro")}</div>
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
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
      </div>
    </>
  );
}