import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./event-detail.module.scss";

interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  ticket_url?: string;
  description: string;
}

function formatFullDate(
  date: string,
  time: string,
  t: (key: string) => string,
): string {
  const [y, m, d] = date.split("-");
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
  return `${dag} ${maand} ${y} om ${time}`;
}

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        <p>{t("event.loading")}</p>
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

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => navigate("/calendar")}
      >
        {t("event.back")}
      </button>

      <span className={styles.type}>{event.type}</span>
      <h1 className={styles.title}>{event.title}</h1>

      <div className={styles.info}>
        <p>
          <strong>{t("event.date")}:</strong>{" "}
          {formatFullDate(event.date, event.time, t)}
        </p>
        <p>
          <strong>{t("event.location")}:</strong> {event.location}
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
        dangerouslySetInnerHTML={{ __html: event.description }}
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