"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

export default function HomePage() {
  const [activeFile, setActiveFile] = useState("README.md");
  const [openFiles, setOpenFiles] = useState([
    "README.md",
    "project.md",
    "tasks.md",
  ]);
  const [expandedFolders, setExpandedFolders] = useState(["docs", "src"]);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showHistory, setShowHistory] = useState(true);

  const toggleFolder = (folder: string) => {
    if (expandedFolders.includes(folder)) {
      setExpandedFolders(expandedFolders.filter((f) => f !== folder));
    } else {
      setExpandedFolders([...expandedFolders, folder]);
    }
  };

  const openFile = (file: string) => {
    setActiveFile(file);
    if (!openFiles.includes(file)) {
      setOpenFiles([...openFiles, file]);
    }
  };

  const closeFile = (file: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter((f) => f !== file);
    setOpenFiles(newOpenFiles);
    if (activeFile === file && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[0]);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "edit" ? "preview" : "edit");
  };

  return (
    <div
      className={`${styles.appContainer} ${
        theme === "dark" ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <header
        className={`${styles.header} ${
          theme === "dark" ? styles.headerDark : ""
        }`}
      >
        <div>
          <h1>협업 텍스트 에디터</h1>
        </div>
        <button onClick={toggleTheme}>테마</button>
      </header>
      <div className={styles.editorContainer}>
        <aside
          className={`${styles.fileList} ${
            theme === "dark" ? styles.fileListDark : ""
          }`}
        >
          {openFiles.map((file) => (
            <div key={file} onClick={() => openFile(file)}>
              {file}
            </div>
          ))}
        </aside>
        <main className={styles.editorContainer}>
          <div
            className={`${styles.tab} ${
              theme === "dark" ? styles.tabDark : ""
            } ${activeFile === openFiles[0] ? styles.tabActive : ""}`}
          >
            {activeFile}
            <button onClick={(e) => closeFile(activeFile, e)}>X</button>
          </div>
          <div
            className={`${styles.editorArea} ${
              theme === "dark" ? styles.editorDark : ""
            }`}
          >
            <pre>{`# Markdown Viewer\n\n선택된 파일: ${activeFile}`}</pre>
          </div>
        </main>
      </div>
      <footer
        className={`${styles.statusBar} ${
          theme === "dark" ? styles.statusBarDark : ""
        }`}
      >
        상태 표시줄: {activeFile}
        <button onClick={toggleViewMode}>
          {viewMode === "edit" ? "미리보기" : "편집"}
        </button>
      </footer>
    </div>
  );
}
