import { useState } from "react";
import styles from "../styles/components/PasswordModal.module.css";

export default function PasswordModal({
  password,
  onConfirm,
  onCancel,
  onCopy,
}) {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Generated Password</h3>
        <p className={styles.message}>
          Press Enter or Tab to use this password, or copy it manually
        </p>

        <div className={styles.passwordDisplay}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            readOnly
            className={styles.passwordInput}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                onConfirm();
              }
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.toggleBtn}
            title={showPassword ? "Hide" : "Show"}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={onCopy}
            className={styles.copyBtn}
          >
            Copy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={styles.confirmBtn}
          >
            Use Password
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
