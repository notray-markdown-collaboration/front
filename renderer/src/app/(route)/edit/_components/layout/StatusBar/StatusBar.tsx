import React from "react";
import styles from "./StatusBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
interface User {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface StatusBarProps {
  theme: "light" | "dark";
  activeFile: string;
  activeUsers: User[];
  viewMode: "edit" | "preview";
  toggleViewMode: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  theme,
  activeFile,
  activeUsers,
  viewMode,
  toggleViewMode,
}) => {
  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;

  return (
    <div className={`${styles.statusBar} ${themeClass}`}>
      <div className={styles.leftGroup}>
        <span>{activeFile}</span>
        <span>마크다운</span>
        <span>UTF-8</span>
      </div>
      <div className={styles.rightGroup}>
        <div className={styles.collaboratorGroup}>
          <span>협업자:</span>
          {activeUsers.map((user) => (
            <div
              key={user.id}
              className={styles.collaborator}
              title={user.name}
            >
              <span
                className={styles.dot}
                style={{ backgroundColor: user.color }}
              ></span>
              <span>{user.name}</span>
            </div>
          ))}
        </div>
        <button onClick={toggleViewMode} className={styles.viewModeButton}>
          <FontAwesomeIcon
            icon={viewMode === "edit" ? faEye : faEdit}
          ></FontAwesomeIcon>
          <span>{viewMode === "edit" ? "미리보기" : "편집"}</span>
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
