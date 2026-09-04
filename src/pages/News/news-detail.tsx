import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import styles from "./news-detail.module.scss";

type NewsItem = {
  id: number;
  title: string;
  schrijver: string;
  content: string;
  category: string;
  createdAt: string;
};

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const { data, error } = await supabase
        .from("ImagesGoodCauses")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setItem(data);
      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) return null;

  if (!item) {
    return (
      <div className={styles.container}>
        <h1>Artikel niet gevonden</h1>
        <button className={styles.backButton} onClick={() => navigate("/news")}>
          Terug naar nieuws
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerButtons}>
        <button className={styles.backButton} onClick={() => navigate("/news")}>
          ← Terug naar overzicht
        </button>
        <span className={styles.category}>{item.category}</span>
      </div>
      <h1 className={styles.title}>{item.title}</h1>

      <p className={styles.author}>Door {item.schrijver}</p>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </div>
  );
}
