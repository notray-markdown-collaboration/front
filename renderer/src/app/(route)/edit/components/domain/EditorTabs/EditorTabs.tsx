import React from "react";
import styles from "./EditorTabs.module.css";

interface EditorTabsProps {
  theme: "light" | "dark";
  activeFile: string;
  setActiveFile: (file: string) => void;
  openFiles: string[];
  setOpenFiles: (files: string[]) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  theme,
  activeFile,
  setActiveFile,
  openFiles,
  setOpenFiles,
}) => {
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
            <i
              className={`fas ${
                file.endsWith(".tsx") ? "fa-file-code" : "fa-file-alt"
              } ${styles.tabIcon} ${iconClass}`}
            ></i>
            <span className={styles.tabName}>{file.split("/").pop()}</span>
            <button
              onClick={(e) => closeFile(file, e)}
              className={styles.closeButton}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditorTabs;
