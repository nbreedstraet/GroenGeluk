import styles from "./loader.module.scss";

interface LoaderProps {
  label: string;
}

export default function Loader({ label }: LoaderProps) {
  return <div className={styles.loader} role="status" aria-label={label} />;
}