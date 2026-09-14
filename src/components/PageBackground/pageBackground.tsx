import { useState } from "react";
import { useTheme, themes } from "../../context/ThemeContext";
import { processSvg } from "../../lib/processSvg";
import styles from "./pageBackground.module.scss";

const DEFAULT_POSITIONS = [
  { top: "8%", left: "2%", width: "22%", rotate: "-8deg" },
  { bottom: "8%", right: "2%", width: "22%", rotate: "10deg" },
];

type Position = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  rotate: string;
};

export default function PageBackground({
  svgRaws,
  positions = DEFAULT_POSITIONS,
  opacity = 0.3,
}: {
  svgRaws: string[];
  positions?: Position[];
  opacity?: number;
}) {
  const { theme } = useTheme();
  const color = themes[theme].text;

  const raws = svgRaws.slice(0, 2);
  const [processed] = useState(() => raws.map((svg) => processSvg(svg, color)));

  return (
    <div className={styles.background} style={{ opacity }} aria-hidden="true">
      {positions.slice(0, 2).map((pos, i) => (
        <div
          key={i}
          className={styles.item}
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            width: pos.width,
            transform: `rotate(${pos.rotate})`,
          }}
          dangerouslySetInnerHTML={{ __html: processed[i] }}
        />
      ))}
    </div>
  );
}
