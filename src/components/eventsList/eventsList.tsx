import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../pages/Calendar/calendar.module.scss";

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

function formatDate(
  date: string,
  t: (key: string) => string,
): { dag: string; maand: string } {
  const datePart = date.split("T")[0];
  const [m, d] = datePart.split("-");
  const maanden = [
    t("calendar.months.jan"),
    t("calendar.months.feb"),
    t("calendar.months.mar"),
    t("calendar.months.apr"),
    t("calendar.months.may"),
    t("calendar.months.jun"),
    t("calendar.months.jul"),
    t("calendar.months.aug"),
    t("calendar.months.sep"),
    t("calendar.months.oct"),
    t("calendar.months.nov"),
    t("calendar.months.dec"),
  ];
  return {
    dag: d ?? date,
    maand: maanden[parseInt(m) - 1] || "???",
  };
}

export default function EventsList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("kalender")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setEvents(data ?? []);
      setLoading(false);
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <p>{t("calendar.loading")}</p>;
  }

  if (error) {
    return <p>Fout bij laden: {error}</p>;
  }

  if (events.length === 0) {
    return <p>{t("calendar.noEvents")}</p>;
  }

  return (
    <>
      {events.map((event: Event) => {
        const { dag, maand } = formatDate(event.date, t);

        return (
          <div
            key={event.id}
            className={styles.eventCard}
            onClick={() => navigate(`/calendar/${event.id}`)}
          >
            <div className={styles.datum}>
              <span className={styles.dag}>{dag}</span>
              <span className={styles.maand}>{maand}</span>
            </div>

            <div className={styles.eventInfo}>
              <span className={styles.type}>{event.type}</span>
              <h3>{event.title}</h3>
              <p className={styles.location}>
                {event.location}
                {event.time && (
                  <span className={styles.time}> · {event.time}</span>
                )}
              </p>
            </div>

            <button
              type="button"
              className={styles.ticketButton}
              onClick={() => {
                if (event.ticket_url) {
                  window.open(event.ticket_url, "_blank", "noopener,noreferrer");
                } else {
                  navigate(`/calendar/${event.id}`);
                }
              }}
            >
              {t("calendar.tickets")}
            </button>
          </div>
        );
      })}
    </>
  );
}
