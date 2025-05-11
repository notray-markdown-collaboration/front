// 메인 문서 부분
import React from "react";
import { FileItem } from "../types";
import styles from './MainContent.module.css';
import FileTable from "./FileTable";
import FileGrid from "./FileGrid";

interface MainContentProps {
  darkMode: boolean;
  viewMode: "list" | "grid";
  currentFolder: string;
  files: FileItem[];
  onToggleViewMode: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  darkMode,
  viewMode,
  currentFolder,
  files,
  onToggleViewMode,
}) => {
  return (
      <main className={`${styles.main} ${darkMode ? styles.mainDark : styles.mainLight}`}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.folderTitle}>{currentFolder}</h2>
            <div className={`${styles.fileCount} ${darkMode ? styles.textGray400 : styles.textGray500}`}>
              {files.length}개 파일
            </div>
          </div>

          <div className={styles.controls}>
            <div className={`${styles.viewModeWrapper} ${darkMode ? styles.bgGray800 : styles.bgGray100}`}>
              <button
                className={`${styles.toggleBtn} ${viewMode === "list" ? (darkMode ? styles.activeDark : styles.activeLight) : ""}`}
                onClick={onToggleViewMode}
              >
                <i className="fas fa-list"></i>
              </button>
              <button
                className={`${styles.toggleBtn} ${viewMode === "grid" ? (darkMode ? styles.activeDark : styles.activeLight) : ""}`}
                onClick={onToggleViewMode}
              >
                <i className="fas fa-th-large"></i>
              </button>
            </div>

            <button className={`${styles.controlBtn} ${darkMode ? styles.activeDarkControlBtn : styles.activeLightControlBtn}`}>
              <i className="fas fa-sort-amount-down"></i>
            </button>

            <button className={`${styles.controlBtn} ${darkMode ? styles.activeDarkControlBtn : styles.activeLightControlBtn}`}>
              <i className="fas fa-filter"></i>
            </button>
          </div>
        </div>

        {viewMode === "list" ? (
          <FileTable darkMode={darkMode} files={files} />
        ) : (
          <FileGrid darkMode={darkMode} files={files} />
        )}
      </div>
    </main>
  );
};

export default MainContent;
