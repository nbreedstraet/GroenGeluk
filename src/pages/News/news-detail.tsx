import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./news-detail.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import Loader from "../../components/Loader/loader";
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
  bronnen: string | null;
  category: string;
  category_i18n: Record<string, string> | null;
  createdAt: string;
};

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader label={t("news.loading")} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className={styles.container}>
        <h1>{t("news.notFound")}</h1>
        <button className={styles.backButton} onClick={() => navigate("/news")}>
          {t("news.backToNews")}
        </button>
      </div>
    );
  }

  const title = vertaalVeld(item.title_i18n, i18n.language) || item.title;
  const content = vertaalVeld(item.content_i18n, i18n.language) || item.content;
  const category =
    vertaalVeld(item.category_i18n, i18n.language) || item.category;
  const bronnen = (item.bronnen || "")
    .split(/\r?\n/)
    .map((bron) => bron.trim())
    .filter(Boolean);

  return (
    <div className={styles.container}>
      <PageBackground svgRaws={[svg1, svg2]} />
      {/* <PageBackground kader={"kader2"} /> */}
      <div className={styles.containerButtons}>
        <button className={styles.backButton} onClick={() => navigate("/news")}>
          {t("news.backToOverview")}
        </button>
        <span className={styles.category}>{category}</span>
      </div>
      <h1 className={styles.title}>{title}</h1>

      <p className={styles.author}>{t("news.by", { name: item.schrijver })}</p>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {bronnen.length > 0 && (
        <div className={styles.sources}>
          <h2 className={styles.sourcesTitle}>{t("news.sources")}</h2>
          <ul className={styles.sourcesList}>
            {bronnen.map((bron) => (
              <li key={bron}>
                {/^https?:\/\//i.test(bron) ? (
                  <a
                    className={styles.sourceLink}
                    href={bron}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bron}
                  </a>
                ) : (
                  bron
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
