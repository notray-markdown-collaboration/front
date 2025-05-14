import styles from "./FileTable.module.css";
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
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

interface FileTableProps {
  darkMode: boolean;
  files: FileItem[];
}

export default function FileTable({ darkMode, files }: FileTableProps) {
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

  const getIconClass = (fileName: string) => {
    if (fileName.endsWith(".docx")) return styles.iconWord;
    if (fileName.endsWith(".pdf")) return styles.iconPdf;
    if (fileName.endsWith(".pptx")) return styles.iconPpt;
    if (fileName.endsWith(".xlsx")) return styles.iconXls;
    if (fileName.endsWith(".zip")) return styles.iconZip;
    if (fileName.endsWith(".png") || fileName.endsWith(".jpg"))
      return styles.iconImg;
    return styles.iconDefault;
  };

  return (
    <div
      className={`${styles.wrapper} ${
        darkMode ? styles.borderDark : styles.borderLight
      }`}
    >
      <table className={styles.table}>
        <thead className={darkMode ? styles.theadDark : styles.theadLight}>
          <tr>
            <th className={styles.th}>이름</th>
            <th className={styles.th}>수정일</th>
            <th className={styles.th}>크기</th>
            <th className={styles.th}>수정자</th>
            <th className={`${styles.th} ${styles.right}`}>작업</th>
          </tr>
        </thead>
        <tbody className={darkMode ? styles.tbodyDark : styles.tbodyLight}>
          {files.map((file) => (
            <tr
              key={file.id}
              className={darkMode ? styles.trDark : styles.trLight}
            >
              <td className={styles.td}>
                <div className={styles.nameCell}>
                  <FontAwesomeIcon
                    icon={getIcon(file.name)}
                    className={`${getIconClass(file.name)} ${styles.icon}`}
                  />
                  <span className={styles.tdName}>{file.name}</span>
                </div>
              </td>
              <td className={styles.td}>{file.modified}</td>
              <td className={styles.td}>{file.size}</td>
              <td className={styles.td}>{file.modifiedBy}</td>
              <td className={`${styles.td} ${styles.right}`}>
                <button className={styles.actionBtn}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
