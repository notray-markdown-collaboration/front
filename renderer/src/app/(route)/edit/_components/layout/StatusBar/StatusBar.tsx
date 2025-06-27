import React from "react";
import styles from "./StatusBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useReadingFileStore } from "@/_store/readingFileStore";
import { getFilename } from "@/(route)/edit/_utils/GetFileName";
interface User {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface StatusBarProps {
  theme: "light" | "dark";
  activeUsers: User[];
  viewMode: "edit" | "preview";
  toggleViewMode: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  theme,
  activeUsers,
  viewMode,
  toggleViewMode,
}) => {
  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;
  const { selectedFile } = useReadingFileStore();
  return (
    <div className={`${styles.statusBar} ${themeClass}`}>
      <div className={styles.leftGroup}>
        <span>{getFilename(selectedFile?.path ?? '')}</span>
        <span>{selectedFile?.path.endsWith(".md") ? '마크다운' : selectedFile?.path.endsWith(".txt") ? '텍스트' : '알수없음'}</span>
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
