import React from "react";
import styles from "./FileTable.module.css";
import { FileItem } from "../_types";

interface FileTableProps {
  darkMode: boolean;
  files: FileItem[];
}

const FileTable: React.FC<FileTableProps> = ({ darkMode, files }) => {
  const getIconFa = (fileName: string) => {
    if (fileName.endsWith(".docx")) return "fa-file-word";
    if (fileName.endsWith(".pdf")) return "fa-file-pdf";
    if (fileName.endsWith(".pptx")) return "fa-file-powerpoint";
    if (fileName.endsWith(".xlsx")) return "fa-file-excel";
    if (fileName.endsWith(".zip")) return "fa-file-archive";
    if (fileName.endsWith(".png") || fileName.endsWith(".jpg"))
      return "fa-file-image";
    return "fa-file";
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
                  <i
                    className={`fas ${getIconFa(file.name)} ${getIconClass(
                      file.name
                    )} ${styles.icon}`}
                  ></i>
                  <span className={styles.tdName}>{file.name}</span>
                </div>
              </td>
              <td className={styles.td}>{file.modified}</td>
              <td className={styles.td}>{file.size}</td>
              <td className={styles.td}>{file.modifiedBy}</td>
              <td className={`${styles.td} ${styles.right}`}>
                <button className={styles.actionBtn}>
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
