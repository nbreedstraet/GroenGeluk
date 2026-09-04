import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [filter, setFilter] = useState("alle");
  const navigate = useNavigate();

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
    "alle",
    ...new Set(items.map((i) => i.category).filter(Boolean)),
  ];

  const filtered =
    filter === "alle" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <div className={styles.marges}>
        <div className={styles.intro}>
          Op deze plek delen we met veel plezier al onze kleine en grote
          verhalen. Van boeiende gesprekken met partners en geëngageerde
          gezichten achter het goede doel van de maand, tot onze blik op wat er
          beweegt in de wereld en onze favoriete seizoensgebonden recepten.
        </div>
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

              <p className={styles.author}>Door {item.schrijver}</p>

              <p className={styles.summary}>{summarize(item.content)}</p>

              <span className={styles.readMore}>Lees meer →</span>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
