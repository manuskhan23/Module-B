import styles from "../styles/components/Button.module.css";

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon: Icon = null,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ""
      } ${className}`}
    >
      {Icon && <Icon className={styles.icon} />}
      {children}
    </button>
  );
}
