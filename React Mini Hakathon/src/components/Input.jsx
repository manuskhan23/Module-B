import styles from "../styles/components/Input.module.css";

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  label,
  error = null,
  icon: Icon = null,
}) {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {Icon && <Icon className={styles.inputIcon} />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`${styles.input} ${error ? styles.error : ""} ${
            Icon ? styles.withIcon : ""
          }`}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
