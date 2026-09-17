import { useMemo } from "react";
import { useTheme, themes } from "../../context/ThemeContext";
import { processSvg } from "../../lib/processSvg";
import styles from "./pageBackground.module.scss";

import kader1 from "../../assets/kader1.svg?raw";
import kader2 from "../../assets/kader2.svg?raw";
import kader3 from "../../assets/kader3.svg?raw";

export type KaderKey = "kader1" | "kader2" | "kader3";

const KADERS: Record<KaderKey, string> = {
  kader1,
  kader2,
  kader3,
};

export default function PageBackground({
  kader = "kader1",
  opacity = 1,
  height = "600px",
  width = "100%",
  marginTop = "6rem",
}: {
  kader?: KaderKey;
  opacity?: number;
  height?: string | number;
  width?: string | number;
  marginTop?: string | number;
}) {
  const { theme } = useTheme();
  const color = themes[theme].text;

  const processed = useMemo(
    () => processSvg(KADERS[kader], color),
    [kader, color],
  );

  return (
    <div
      className={styles.background}
      style={{ opacity, height, width, top: marginTop }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}
