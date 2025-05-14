import styles from "./FileGrid.module.css";
import { FileItem } from "../../../../_types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileExcel,
  faFileArchive,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";

interface FileGridProps {
  darkMode: boolean;
  files: FileItem[];
}


export default function FileGrid({ darkMode, files }: FileGridProps) {
  const getIcon = (fileName: string) => {
    if (fileName.endsWith(".docx")) return faFileWord;
    if (fileName.endsWith(".pdf")) return faFilePdf;
    if (fileName.endsWith(".pptx")) return faFilePowerpoint;
    if (fileName.endsWith(".xlsx")) return faFileExcel;
    if (fileName.endsWith(".zip")) return faFileArchive;
    if (fileName.endsWith(".png") || fileName.endsWith(".jpg"))
      return faFileImage;
    return faFile;
  };

  const getIconClass = (name: string) => {
    if (name.endsWith(".docx")) return `${styles.icon} ${styles.textBlue}`;
    if (name.endsWith(".pdf")) return `${styles.icon} ${styles.textRed}`;
    if (name.endsWith(".pptx")) return `${styles.icon} ${styles.textOrange}`;
    if (name.endsWith(".xlsx")) return `${styles.icon} ${styles.textGreen}`;
    if (name.endsWith(".zip")) return `${styles.icon} ${styles.textPurple}`;
    if (name.endsWith(".png") || name.endsWith(".jpg"))
      return `${styles.icon} ${styles.textTeal}`;
    return `${styles.icon} ${styles.textGray}`;
  };

  return (
    <div className={styles.gridWrapper}>
      {files.map((file) => (
        <div
          key={file.id}
          className={`${styles.card} ${
            darkMode ? styles.cardDark : styles.cardLight
          }`}
        >
          <div className={styles.iconRow}>
            <FontAwesomeIcon
              icon={getIcon(file.name)}
              className={getIconClass(file.name)}
            />
          </div>
          <h3 className={styles.filename} title={file.name}>
            {file.name}
          </h3>
          <div
            className={`${styles.meta} ${
              darkMode ? styles.metaDark : styles.metaLight
            }`}
          >
            {file.modified} · {file.size}
          </div>
        </div>
      ))}
    </div>
  );
}
