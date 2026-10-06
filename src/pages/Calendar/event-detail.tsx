import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./event-detail.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import Loader from "../../components/Loader/loader";
import svg1 from "../../assets/tekeningen/Tekening-15.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-16.svg?raw";
import { vertaalVeld } from "../../lib/vertaal";
import { formatTijd } from "../../lib/tijd";

type I18n = Record<string, string> | null;

interface Event {
  id: number;
  title: string;
  title_i18n: I18n;
  type: string;
  type_i18n: I18n;
  date: string;
  time: string;
  location: string;
  location_i18n: I18n;
  ticket_url?: string;
  description: string;
  description_i18n: I18n;
}

function formatFullDate(date: string, t: (key: string) => string): string {
  const [y, m, d] = date.split("T")[0].split("-");
  if (!y || !m || !d) return date;
  const months = [
    t("event.months.january"),
    t("event.months.february"),
    t("event.months.march"),
    t("event.months.april"),
    t("event.months.may"),
    t("event.months.june"),
    t("event.months.july"),
    t("event.months.august"),
    t("event.months.september"),
    t("event.months.october"),
    t("event.months.november"),
    t("event.months.december"),
  ];
  const dag = parseInt(d, 10);
  const maand = months[parseInt(m, 10) - 1] ?? "???";
  return `${dag} ${maand} ${y}`;
}

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("kalender")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setEvent(data);
      setLoading(false);
    }

    if (id) fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader label={t("event.loading")} />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className={styles.container}>
        <h1>{t("event.notFound")}</h1>
        <button onClick={() => navigate("/calendar")}>
          {t("event.backToCalendar")}
        </button>
      </div>
    );
  }

  const tr = (i18nVeld: I18n, origineel: string) =>
    vertaalVeld(i18nVeld, i18n.language) || origineel;

  const title = tr(event.title_i18n, event.title);
  const type = tr(event.type_i18n, event.type);
  const location = tr(event.location_i18n, event.location);
  const description = tr(event.description_i18n, event.description);

  return (
    <div className={styles.container}>
      <PageBackground svgRaws={[svg1, svg2]} />
      {/* <PageBackground kader={"kader1"} /> */}
      <button
        className={styles.backButton}
        onClick={() => navigate("/calendar")}
      >
        {t("event.back")}
      </button>

      <span className={styles.type}>{type}</span>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.info}>
        <p>
          <strong>{t("event.date")}:</strong>{" "}
          {formatFullDate(event.date, t)}
        </p>
        {formatTijd(event.time) && (
          <p>
            <strong>{t("event.time")}:</strong> {formatTijd(event.time)}
          </p>
        )}
        <p>
          <strong>{t("event.location")}:</strong> {location}
        </p>
        {event.ticket_url && (
          <a
            href={event.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ticketButton}
          >
            {t("event.buyTickets")}
          </a>
        )}
      </div>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {event.ticket_url && (
        <a
          href={event.ticket_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ticketButton}
        >
          {t("event.buyTickets")}
        </a>
      )}
    </div>
  );
}
