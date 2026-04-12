import styles from "../styles/components/Card.module.css";

export default function Card({ children, className = "" }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
