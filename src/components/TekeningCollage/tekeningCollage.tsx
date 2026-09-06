import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Masonry from "react-masonry-css";
import { useTheme, themes } from "../../context/ThemeContext";
import { supabase } from "../../lib/supabaseClient";
import styles from "./tekeningCollage.module.scss";

const svgModules = import.meta.glob("../../assets/tekeningen/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});
const allSvgContents = Object.values(svgModules) as string[];

import kader09Raw from "../../assets/kaders/Kaders-09.svg?raw";
import kader10Raw from "../../assets/kaders/Kaders-10.svg?raw";

const KADERS = [
  { svgRaw: kader09Raw, bucket: "GroenGelukImages" },
  { svgRaw: kader10Raw, bucket: "GroenGelukGoedeDoelen", link: "/cause" },
];

const links = [
  { key: "nav.about", link: "/about" },
  { key: "nav.news", link: "/news" },
  { key: "nav.calendar", link: "/calendar" },
  { key: "nav.contact", link: "/werking" },
  { key: "nav.support", link: "/support" },
  { key: "nav.volunteers", link: "/volunteers" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const breakpointColumns = {
  default: 3,
  900: 2,
  500: 1,
};

function processSvg(svg: string, color: string): string {
  let html = svg;
  html = html.replace(/<style>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/#006837/gi, color);
  html = html.replace(/stroke="#00000000?"/gi, `stroke="${color}"`);
  html = html.replace(/\s(width|height)="[^"]*"/g, "");
  html = html.replace(/<svg\b/, '<svg width="100%" height="auto"');
  html = html.replace(/<svg\b/, '<svg overflow="visible"');
  html = html.replace(
    "</svg>",
    `<style>path, polygon, rect, circle, ellipse, line, polyline { fill: ${color}; stroke: none; }</style></svg>`,
  );
  return html;
}

function processKaderSvg(svg: string, color: string): string {
  let html = svg;
  html = html.replace(/<style>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/#006837/gi, color);
  html = html.replace(/fill="#[0-9a-fA-F]+"/gi, 'fill="none"');
  html = html.replace(/stroke="#[0-9a-fA-F]+"/gi, `stroke="${color}"`);
  html = html.replace(/\s(width|height)="[^"]*"/g, "");
  html = html.replace(/<svg\b/, '<svg width="100%" height="100%"');
  html = html.replace(/<svg\b/, '<svg overflow="visible"');

  return html;
}

async function fetchPublicUrls(bucket: string): Promise<string[]> {
  const { data: files, error } = await supabase.storage
    .from(bucket)
    .list("", { limit: 100 });

  if (error || !files) return [];

  const urls: string[] = [];

  for (const file of files) {
    if (file.id) {
      urls.push(
        supabase.storage.from(bucket).getPublicUrl(file.name).data.publicUrl,
      );
    }

    if (file.name === "Images") {
      const { data: nestedFiles } = await supabase.storage
        .from(bucket)
        .list("Images", { limit: 3 });

      nestedFiles?.forEach((nested) => {
        if (nested.id) {
          urls.push(
            supabase.storage.from(bucket).getPublicUrl(`Images/${nested.name}`)
              .data.publicUrl,
          );
        }
      });
    }
  }

  return urls;
}

function KaderTile({
  svgRaw,
  bucket,
  color,
  link,
  t,
}: {
  svgRaw: string;
  bucket: string;
  color: string;
  link?: string;
  t: (key: string) => string;
}) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchPublicUrls(bucket).then((urls) => {
      setPhotos(shuffle(urls));
      setIndex(0);
    });
  }, [bucket]);

  const svgHtml = useMemo(
    () => processKaderSvg(svgRaw, color),
    [svgRaw, color],
  );

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % photos.length);
  };

  const content = (
    <>
      <button
        className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
        onClick={prev}
        aria-label={t("tekeningCollage.prevPhoto")}
      >
        ‹
      </button>
      {photos.length > 0 && (
        <img
          key={photos[index]}
          src={photos[index]}
          alt=""
          className={styles.kaderPhoto}
        />
      )}
      <button
        className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
        onClick={next}
        aria-label={t("tekeningCollage.nextPhoto")}
      >
        ›
      </button>
      <div
        className={styles.kaderOverlay}
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />
    </>
  );

  if (link) {
    return (
      <Link to={link} className={styles.kaderTile}>
        {content}
      </Link>
    );
  }

  return <div className={styles.kaderTile}>{content}</div>;
}

export default function TekeningCollage({
  intro,
}: {
  intro?: React.ReactNode;
}) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const color = themes[theme].text;

  const [shuffled] = useState(() => shuffle(allSvgContents));

  const collageItems = useMemo(() => {
    const tekeningen = links.map((link, i) => ({
      type: "tekening" as const,
      id: `tekening-${i}`,
      html: processSvg(shuffled[i % shuffled.length], color),
      link,
    }));

    const kaders = KADERS.map((kader, i) => ({
      type: "kader" as const,
      id: `kader-${i}`,
      ...kader,
    }));

    // Vaste volgorde: links (tekst) altijd op dezelfde plek,
    // kaders er tussendoor op vaste posities.
    const items: (typeof tekeningen[number] | typeof kaders[number])[] = [
      tekeningen[0],
      tekeningen[1],
      kaders[0],
      tekeningen[2],
      tekeningen[3],
      kaders[1],
      tekeningen[4],
      tekeningen[5],
    ];

    return intro
      ? [
          { type: "intro" as const, id: "intro", content: intro },
          ...items,
        ]
      : items;
  }, [color, shuffled, intro]);

  return (
    <div className={styles.wrapper}>
      <Masonry
        breakpointCols={breakpointColumns}
        className={styles.masonry}
        columnClassName={styles.masonryColumn}
      >
        {collageItems.map((item) => {
          if (item.type === "tekening") {
            return (
              <Link key={item.id} to={item.link.link} className={styles.item}>
                <div dangerouslySetInnerHTML={{ __html: item.html }} />
                <p>{t(item.link.key)}</p>
              </Link>
            );
          }

          if (item.type === "intro") {
            return (
              <div key={item.id} className={styles.itemIntro}>
                {item.content}
              </div>
            );
          }

          return (
            <div key={item.id} className={styles.itemKader}>
              <KaderTile
                svgRaw={item.svgRaw}
                bucket={item.bucket}
                color={color}
                link={item.link}
                t={t}
              />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
}
