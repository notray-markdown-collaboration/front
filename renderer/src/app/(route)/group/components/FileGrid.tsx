import React from "react";
import styles from './FileGrid.module.css';
import { FileItem } from "../types";

interface FileGridProps {
  darkMode: boolean;
  files: FileItem[];
}

const FileGrid: React.FC<FileGridProps> = ({ darkMode, files }) => {
  const getIconFa = (fileName: string) => {
    if (fileName.endsWith(".docx")) return "fa-file-word";
    if (fileName.endsWith(".pdf")) return "fa-file-pdf";
    if (fileName.endsWith(".pptx")) return "fa-file-powerpoint";
    if (fileName.endsWith(".xlsx")) return "fa-file-excel";
    if (fileName.endsWith(".zip")) return "fa-file-archive";
    if (fileName.endsWith(".png") || fileName.endsWith(".jpg")) return "fa-file-image";
    return "fa-file";
  }  

  const getIconClass = (name: string) => {
    if (name.endsWith(".docx")) return `${styles.icon} ${styles.textBlue}`;
    if (name.endsWith(".pdf")) return `${styles.icon} ${styles.textRed}`;
    if (name.endsWith(".pptx")) return `${styles.icon} ${styles.textOrange}`;
    if (name.endsWith(".xlsx")) return `${styles.icon} ${styles.textGreen}`;
    if (name.endsWith(".zip")) return `${styles.icon} ${styles.textPurple}`;
    if (name.endsWith(".png") || name.endsWith(".jpg")) return `${styles.icon} ${styles.textTeal}`;
    return `${styles.icon} ${styles.textGray}`;
  };

  
  return (
     <div className={styles.gridWrapper}>
      {files.map((file) => (
        <div
          key={file.id}
          className={`${styles.card} ${darkMode ? styles.cardDark : styles.cardLight}`}
        >
          <div className={styles.iconRow}>
            <i className={`fas ${getIconFa(file.name)} ${getIconClass(file.name)}`}></i>
          </div>
          <h3 className={styles.filename} title={file.name}>
            {file.name}
          </h3>
          <div className={`${styles.meta} ${darkMode ? styles.metaDark : styles.metaLight}`}>
            {file.modified} · {file.size}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileGrid;
