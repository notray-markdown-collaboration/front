import React from "react";
import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faChevronDown,
  faChevronRight,
  faFolder,
  faPlus,
  faFolderPlus,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  theme: "light" | "dark";
  fileStructure: Record<
    string,
    { type: "file" | "folder"; parent: string | null }
  >;
  activeFile: string;
  openFile: (path: string) => void;
  openFiles: string[];
  setOpenFiles: (paths: string[]) => void;
  expandedFolders: string[];
  setExpandedFolders: (folders: string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  theme,
  fileStructure,
  activeFile,
  openFile,
  expandedFolders,
  setExpandedFolders,
}) => {
  const toggleFolder = (folder: string) => {
    if (expandedFolders.includes(folder)) {
      setExpandedFolders(expandedFolders.filter((f) => f !== folder));
    } else {
      setExpandedFolders([...expandedFolders, folder]);
    }
  };

  const getMarginClass = (level: number) => {
    switch (level) {
      case 1:
        return styles["ml-4"];
      case 2:
        return styles["ml-8"];
      case 3:
        return styles["ml-12"];
      case 4:
        return styles["ml-16"];
      default:
        return styles["ml-0"];
    }
  };

  const renderTree = (parent: string | null, level: number = 0) => {
    return Object.entries(fileStructure)
      .filter(([_, info]) => info.parent === parent)
      .map(([path, info]) => {
        const marginClass = getMarginClass(level);
        if (info.type === "file") {
          const isActive = activeFile === path;
          return (
            <div
              key={path}
              onClick={() => openFile(path)}
              className={`${styles.fileItem} ${marginClass} ${
                isActive
                  ? theme === "dark"
                    ? styles.activeFileDark
                    : styles.activeFileLight
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                style={{ marginRight: "0.5rem", color: "#3b82f6" }}
              ></FontAwesomeIcon>
              <span className="truncate">{path.split("/").pop()}</span>
            </div>
          );
        } else {
          const isExpanded = expandedFolders.includes(path);
          return (
            <div key={path} className={marginClass}>
              <div
                onClick={() => toggleFolder(path)}
                className={styles.folderItem}
              >
                <FontAwesomeIcon
                  icon={isExpanded ? faChevronDown : faChevronRight}
                  style={{
                    fontSize: "0.75rem",
                    marginRight: "0.375rem",
                    width: "0.75rem",
                  }}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faFolder}
                  className={styles.folderIcon}
                ></FontAwesomeIcon>
                <span className="truncate">{path.split("/").pop()}</span>
              </div>
              {isExpanded && renderTree(path, level + 1)}
            </div>
          );
        }
      });
  };

  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;

  return (
    <aside className={`${styles.sidebar} ${themeClass}`}>
      <div className={`${styles.header} ${themeClass}`}>
        <h2 className={styles.headerTitle}>작업 파일</h2>
        <div className={styles.headerButtons}>
          <button className={styles.iconButton}>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
            ></FontAwesomeIcon>
          </button>
          <button className={styles.iconButton}>
            <FontAwesomeIcon
              icon={faFolderPlus}
              style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
            ></FontAwesomeIcon>
          </button>
          <button className={styles.iconButton}>
            <FontAwesomeIcon
              icon={faEllipsisH}
              style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div className={styles.fileTree}>{renderTree(null)}</div>
    </aside>
  );
};

export default Sidebar;
