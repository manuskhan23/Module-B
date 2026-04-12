import { useState } from "react";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordModal from "./PasswordModal";
import { generatePassword } from "../utils/passwordGenerator";
import styles from "../styles/components/PasswordInput.module.css";

export default function PasswordInput({
  value,
  onChange,
  label,
  placeholder,
  name,
  confirmPasswordValue,
  onConfirmPasswordChange,
  isConfirmField = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handlePasswordFocus = () => {
    if (!isConfirmField && !value) {
      const newPassword = generatePassword(12);
      setGeneratedPassword(newPassword);
      setShowModal(true);
    }
  };

  const handleConfirmPassword = () => {
    onChange({
      target: { name, value: generatedPassword },
    });
    if (onConfirmPasswordChange) {
      onConfirmPasswordChange({
        target: { name: "confirmPassword", value: generatedPassword },
      });
    }
    setShowModal(false);
    toast.success("Password applied!");
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast.success("Password copied to clipboard!");
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.formGroup}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            className={styles.input}
            onFocus={handlePasswordFocus}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.toggleButton}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <VisibilityIcon style={{ fontSize: "20px" }} />
            ) : (
              <VisibilityOffIcon style={{ fontSize: "20px" }} />
            )}
          </button>
        </div>
      </div>

      {showModal && (
        <PasswordModal
          password={generatedPassword}
          onConfirm={handleConfirmPassword}
          onCancel={handleModalCancel}
          onCopy={handleCopyPassword}
        />
      )}
    </>
  );
}
