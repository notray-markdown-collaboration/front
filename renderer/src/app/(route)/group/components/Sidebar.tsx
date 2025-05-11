import React from "react";
import styles from "./Sidebar.module.css";
import { Folder } from "../types";

interface SidebarProps {
  darkMode: boolean;
  sidebarOpen: boolean;
  folders: Folder[];
  currentFolder: string;
  onSelectFolder: (folderId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  darkMode,
  sidebarOpen,
  folders,
  currentFolder,
  onSelectFolder,
}) => {
  return (
  <aside
      className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed} ${
        darkMode ? styles.sidebarDark : styles.sidebarLight
      }`}
    >
      <div className={styles.headerPadding}>
        <button
          className={`${styles.newFileButton} ${
            darkMode ? styles.bgBlue600Hover : styles.bgBlue500Hover
          }`}
        >
          <i className="fas fa-plus" style={{ marginRight: "0.5rem" }}></i>
          <span>새 파일 만들기</span>
        </button>
      </div>

      <nav className={styles.folderListWrapper}>
        <ul>
          {folders.map((folder) => (
            <li key={folder.id}>
              <button
                onClick={() => onSelectFolder(folder.id)}
                className={`${styles.folderButton} ${
                  currentFolder === folder.id
                    ? darkMode
                      ? styles.folderActiveDark
                      : styles.folderActiveLight
                    : styles.folderHover
                }`}
              >
                <div className={styles.folderLabel}>
                  <i
                    className="fas fa-folder"
                    style={{ marginRight: "0.75rem", color: "#9CA3AF" }}
                  ></i>
                  <span>{folder.name}</span>
                </div>
                <span
                  className={darkMode ? styles.textGray400 : styles.textGray500}
                >
                  {folder.files}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={darkMode ? styles.footerDark : styles.footerLight}>
        <div className={styles.footerInfoRow}>
          <span className={styles.storageLabel}>스토리지 사용량</span>
          <span className={styles.storageUsage}>100GB 중 65GB 사용</span>
        </div>
        <div id="storage-chart" className={styles.chartContainer}></div>
      </div>
    </aside>
  );
};

export default Sidebar;
