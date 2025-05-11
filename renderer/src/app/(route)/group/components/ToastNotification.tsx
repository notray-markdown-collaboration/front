import React from "react";
import styles from "./ToastNotification.module.css";

interface ToastNotificationProps {
  darkMode: boolean;
  message: string;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ darkMode, message, onClose }) => {
  return (
    <div
      className={`${styles.toast} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.iconWrapper}>
        <div className={styles.iconCircle}>
          <i className={styles.iconCheck}></i>
        </div>
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>파일이 업데이트되었습니다</h4>
        <p className={`${styles.message} ${darkMode ? styles.textGrayDark : styles.textGrayLight}`}>{message}</p>
        <p className={styles.time}>방금 전</p>
      </div>
      <button onClick={onClose} className={styles.closeButton}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default ToastNotification;