import styles from "./MainContent.module.css";
import { FileItem } from "../../../_types";
import FileTable from "../../domain/file/FileGrid/FileGrid";
import FileGrid from "../../domain/file/FileTable/FileTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faThLarge,
  faSortAmountDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

interface MainContentProps {
  darkMode: boolean;
  viewMode: "list" | "grid";
  currentFolder: string;
  files: FileItem[];
  onToggleViewMode: () => void;
}

export default function MainContent({
  darkMode,
  viewMode,
  currentFolder,
  files,
  onToggleViewMode,
}: MainContentProps) {
  return (
    <main
      className={`${styles.main} ${
        darkMode ? styles.mainDark : styles.mainLight
      }`}
    >
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.folderTitle}>{currentFolder}</h2>
            <div
              className={`${styles.fileCount} ${
                darkMode ? styles.textGray400 : styles.textGray500
              }`}
            >
              {files.length}개 파일
            </div>
          </div>

          <div className={styles.controls}>
            <div
              className={`${styles.viewModeWrapper} ${
                darkMode ? styles.bgGray800 : styles.bgGray100
              }`}
            >
              <button
                className={`${styles.toggleBtn} ${
                  viewMode === "list"
                    ? darkMode
                      ? styles.activeDark
                      : styles.activeLight
                    : ""
                }`}
                onClick={onToggleViewMode}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              <button
                className={`${styles.toggleBtn} ${
                  viewMode === "grid"
                    ? darkMode
                      ? styles.activeDark
                      : styles.activeLight
                    : ""
                }`}
                onClick={onToggleViewMode}
              >
                <FontAwesomeIcon icon={faThLarge} />
              </button>
            </div>

            <button
              className={`${styles.controlBtn} ${
                darkMode
                  ? styles.activeDarkControlBtn
                  : styles.activeLightControlBtn
              }`}
            >
              <FontAwesomeIcon icon={faSortAmountDown} />
            </button>

            <button
              className={`${styles.controlBtn} ${
                darkMode
                  ? styles.activeDarkControlBtn
                  : styles.activeLightControlBtn
              }`}
            >
              <FontAwesomeIcon icon={faFilter} />
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
}

