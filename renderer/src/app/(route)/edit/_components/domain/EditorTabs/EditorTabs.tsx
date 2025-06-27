import React, { useEffect, useState } from "react";
import styles from "./EditorTabs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFileCode,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useReadingFileStore } from "@/_store/readingFileStore";
import { getFilename } from "@/(route)/edit/_utils/GetFileName";

interface EditorTabsProps {
  theme: "light" | "dark";
  activeFile: string;
  setActiveFile: (file: string) => void;
}

export default function EditorTabs({
  theme,

}: EditorTabsProps) { 
  const [ openFiles, setOpenFiles ] = useState<string[]>([]);
  const { selectedFile, setSelectedFile } = useReadingFileStore();
  const closeFile = (file: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter((f) => f !== file);
    setOpenFiles(newOpenFiles);
  };
 const handleFileClick = async (filePath: string) => {
    const result = await window.electronAPI.readFile(filePath);
 
    if (result.success) {
      setSelectedFile({ path: filePath, content: result.content! });
    } else {
      alert(`파일을 읽는 중 오류 발생: ${result.error}`);
    }
  };
  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;

  useEffect(() => {
  if (!selectedFile?.path) return;

  if (!openFiles.includes(selectedFile.path)) {
    setOpenFiles([...openFiles, selectedFile.path]);
  }
}, [selectedFile, openFiles]);
  return (
    <div className={`${styles.tabs} ${themeClass}`}>
      {openFiles.map((file) => {
        const iconClass = file.endsWith(".tsx")
          ? styles.tsxIcon
          : styles.mdIcon;
        const tabClass =
          selectedFile?.path === file && theme === "dark"
            ? styles.activeTabDark
            : selectedFile?.path === file && theme === "light"
            ? styles.activeTabLight
            : styles.tab;

        return (
          <div
            key={file}
            onClick={() => handleFileClick(file)}
            className={`${styles.tab} ${tabClass}`}
          >
            <FontAwesomeIcon
              icon={file.endsWith(".tsx") ? faFileCode : faFileAlt}
              className={`${styles.tabIcon} ${iconClass}`}
            />
            <span className={styles.tabName}>{getFilename(file)}</span>
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
