import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./calendar.module.scss";

interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
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

export default function Calendar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

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

  const types = [...new Set(events.map((e) => e.type))];
  const locations = [...new Set(events.map((e) => e.location))];

  const filteredEvents = events.filter((event) => {
    const typeMatch = !filterType || event.type === filterType;
    const locationMatch = !filterLocation || event.location === filterLocation;
    return typeMatch && locationMatch;
  });

  if (loading) {
    return (
      <div className={styles.alles}>
        <p>{t("calendar.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.alles}>
        <p>Fout bij laden: {error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={styles.alles}>
        <p>{t("calendar.noEvents")}</p>
      </div>
    );
  }

  return (
    <div className={styles.alles}>
      <div className={styles.intro}>
        Elke maand organiseren we afwisselend een buffet in de Stelplaats of een
        gezellig diner in de Maakleerplek, evenals een kookworkshop. Af en toe
        gaan we met Groen Geluk op verplaatsing en koken we op uitnodiging én in
        samenwerking met. <br />
        <br />
        In dit overzicht ontdek je waar en wanneer je de komende tijd je voeten
        onder tafel kunt schuiven voor een schoon bordje Groen Geluk. Klik door
        op een evenement voor alle praktische info. De inschrijvingslink vind je
        zowel op de eventpagina zelf als in de bio op onze Instagram.{" "}
        <strong>
          Let wel: inschrijven is pas effectief mogelijk vanaf het aangekondigde
          moment, steeds een week op voorhand rond 18u.
        </strong>
        <br />
        <br />
        <strong>Allergie of intolerantie?</strong>
        Laat het ons op voorhand even weten via het inschrijfformulier. We
        proberen daar in de keuken altijd zo goed mogelijk rekening mee te
        houden, al kunnen we helaas niet altijd honderd procent garantie geven.
      </div>
      <div className={styles.filters}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">{t("calendar.allTypes")}</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">{t("calendar.allLocations")}</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.eventList}>
        {filteredEvents.map((event: Event) => {
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
                  📍 {event.location}
                  {event.time && (
                    <span className={styles.time}> • {event.time}</span>
                  )}
                </p>
              </div>

              <button
                type="button"
                className={styles.ticketButton}
                onClick={() => navigate(`/calendar/${event.id}`)}
              >
                {t("calendar.tickets")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
