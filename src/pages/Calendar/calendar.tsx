import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";
import styles from "./calendar.module.scss";
import PageBackground from "../../components/PageBackground/pageBackground";
import svg1 from "../../assets/tekeningen/Tekening-19.svg?raw";
import svg2 from "../../assets/tekeningen/Tekening-20.svg?raw";
import { vertaalVeld } from "../../lib/vertaal";
import { formatTijd } from "../../lib/tijd";

type I18n = Record<string, string> | null;

const ARROW_WIDTH = 20;

function fitSelectToText(select: HTMLSelectElement | null) {
  if (!select) return;
  const option = select.options[select.selectedIndex];
  if (!option?.textContent) return;

  const style = window.getComputedStyle(select);
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return;
  ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

  const width =
    ctx.measureText(option.textContent).width +
    parseFloat(style.paddingLeft) +
    parseFloat(style.paddingRight) +
    parseFloat(style.borderLeftWidth) +
    parseFloat(style.borderRightWidth) +
    ARROW_WIDTH;

  select.style.width = `${Math.ceil(width)}px`;
}

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

function formatDate(
  date: string,
  t: (key: string) => string,
): { dag: string; maand: string } {
  const iso = date?.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  const parsed = iso || !date ? null : new Date(date);
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

  let dag = "";
  let maandIndex = NaN;

  if (iso) {
    maandIndex = parseInt(iso[2], 10);
    dag = iso[3];
  } else if (parsed && !Number.isNaN(parsed.getTime())) {
    maandIndex = parsed.getUTCMonth() + 1;
    dag = String(parsed.getUTCDate());
  }

  return {
    dag: dag || date,
    maand: maanden[maandIndex - 1] || "???",
  };
}

function toDateKey(date?: string | null): string {
  const match = String(date ?? "").match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!match) return "";
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
}

export default function Calendar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const locationSelectRef = useRef<HTMLSelectElement>(null);

  useLayoutEffect(() => {
    fitSelectToText(typeSelectRef.current);
    fitSelectToText(locationSelectRef.current);
  });

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

  const tr = (i18nVeld: I18n, origineel: string) =>
    vertaalVeld(i18nVeld, i18n.language) || origineel;

  // [origineel, vertaald label]
  const types = [
    ...new Map(
      events
        .filter((e) => e.type)
        .map((e) => [e.type, tr(e.type_i18n, e.type)] as [string, string]),
    ),
  ];
  const locations = [
    ...new Map(
      events
        .filter((e) => e.location)
        .map(
          (e) =>
            [e.location, tr(e.location_i18n, e.location)] as [string, string],
        ),
    ),
  ];
  const van = toDateKey(filterFrom);
  const tot = toDateKey(filterTo);

  const filteredEvents = events.filter((event) => {
    const typeMatch = !filterType || event.type === filterType;
    const locationMatch = !filterLocation || event.location === filterLocation;
    const key = toDateKey(event.date);
    const dateMatch =
      (!van || (!!key && key >= van)) && (!tot || (!!key && key <= tot));
    return typeMatch && locationMatch && dateMatch;
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
        <p>
          {t("calendar.loadError")} {error}
        </p>
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
      <PageBackground svgRaws={[svg1, svg2]} />
      {/* <PageBackground kader={"kader3"} height="150vh" marginTop="5rem" /> */}
      <div className={styles.intro}>
        <p>{t("calendar.intro1")}</p>
        <p>
          {t("calendar.intro2")} <strong>{t("calendar.intro2Strong")}</strong>
        </p>
        <p>
          <strong>{t("calendar.intro3Strong")}</strong> {t("calendar.intro3")}
        </p>
      </div>
      <div className={styles.filters}>
        <select
          ref={typeSelectRef}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">{t("calendar.allTypes")}</option>
          {types.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          ref={locationSelectRef}
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">{t("calendar.allLocations")}</option>
          {locations.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <div className={styles.filterRange}>
          <span className={styles.filterRangeLabel}>
            {t("calendar.fromDate")}:
          </span>
          <input
            type="date"
            value={filterFrom}
            max={filterTo || undefined}
            onChange={(e) => setFilterFrom(e.target.value)}
            className={styles.filterDateInput}
            aria-label={t("calendar.fromDate")}
          />

          <span className={styles.filterRangeDivider} />

          <span className={styles.filterRangeLabel}>
            {t("calendar.untilDate")}:
          </span>
          <input
            type="date"
            value={filterTo}
            min={filterFrom || undefined}
            onChange={(e) => setFilterTo(e.target.value)}
            className={styles.filterDateInput}
            aria-label={t("calendar.untilDate")}
          />
        </div>
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
                <span className={styles.type}>
                  {tr(event.type_i18n, event.type)}
                </span>
                <h3>{tr(event.title_i18n, event.title)}</h3>
                <p className={styles.location}>
                  📍 {tr(event.location_i18n, event.location)}
                  {event.time && (
                    <span className={styles.time}>
                      {" "}
                      • {formatTijd(event.time)}
                    </span>
                  )}
                </p>
              </div>

              <button
                type="button"
                className={styles.ticketButton}
                onClick={(e) => {
                  e.stopPropagation();
                  if (event.ticket_url) {
                    window.open(
                      event.ticket_url,
                      "_blank",
                      "noopener,noreferrer",
                    );
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
      </div>

      <div className={styles.crossLinks}>
        <Link to="/news" className={styles.crossLink}>
          {t("calendar.crossNews")}
        </Link>
        <Link to="/support" className={styles.crossLink}>
          {t("calendar.crossSupport")}
        </Link>
        <Link to="/cause" className={styles.crossLink}>
          {t("calendar.crossCause")}
        </Link>
      </div>
    </div>
  );
}
