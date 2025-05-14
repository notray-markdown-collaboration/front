import React from "react";
import styles from "./EditorTabs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFileCode,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface EditorTabsProps {
  theme: "light" | "dark";
  activeFile: string;
  setActiveFile: (file: string) => void;
  openFiles: string[];
  setOpenFiles: (files: string[]) => void;
}

export default function EditorTabs({
  theme,
  activeFile,
  setActiveFile,
  openFiles,
  setOpenFiles,
}: EditorTabsProps) {
  const closeFile = (file: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter((f) => f !== file);
    setOpenFiles(newOpenFiles);
    if (activeFile === file && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[0]);
    }
  };

  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;

  return (
    <div className={`${styles.tabs} ${themeClass}`}>
      {openFiles.map((file) => {
        const isActive = activeFile === file;
        const iconClass = file.endsWith(".tsx")
          ? styles.tsxIcon
          : styles.mdIcon;
        const tabClass =
          isActive && theme === "dark"
            ? styles.activeTabDark
            : isActive && theme === "light"
            ? styles.activeTabLight
            : styles.tab;

        return (
          <div
            key={file}
            onClick={() => setActiveFile(file)}
            className={`${styles.tab} ${tabClass}`}
          >
            <FontAwesomeIcon
              icon={file.endsWith(".tsx") ? faFileCode : faFileAlt}
              className={`${styles.tabIcon} ${iconClass}`}
            />
            <span className={styles.tabName}>{file.split("/").pop()}</span>
            <button
              onClick={(e) => closeFile(file, e)}
              className={styles.closeButton}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
