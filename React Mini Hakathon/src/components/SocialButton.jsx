import styles from "../styles/components/SocialButton.module.css";

export default function SocialButton({ icon: Icon, label, onClick, disabled = false }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      <Icon className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
