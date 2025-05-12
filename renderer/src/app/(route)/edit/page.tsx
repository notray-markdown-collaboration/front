"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import EditorTabs from "./components/domain/EditorTabs/EditorTabs";
import MarkdownEditor from "./components/domain/MarkdownEditor/MarkdownEditor";
import MarkdownPreview from "./components/domain/MarkdownPreview/MarkdownPreview";
import StatusBar from "./components/layout/StatusBar/StatusBar";
import RightSidebar from "./components/layout/RightSidebar/RightSidebar";
import { fileStructure, initialUsers, sampleMarkdown } from "./utils/constants";

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

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleViewMode = () =>
    setViewMode((prev) => (prev === "edit" ? "preview" : "edit"));

  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;

  return (
    <div className={`${styles.main} ${themeClass}`}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeUsers={initialUsers}
      />

      <div className={styles.sidebarContainer}>
        <Sidebar
          theme={theme}
          fileStructure={fileStructure}
          activeFile={activeFile}
          openFile={setActiveFile}
          openFiles={openFiles}
          setOpenFiles={setOpenFiles}
          expandedFolders={expandedFolders}
          setExpandedFolders={setExpandedFolders}
        />

        <main className={styles.mainContent}>
          <EditorTabs
            theme={theme}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            openFiles={openFiles}
            setOpenFiles={setOpenFiles}
          />

          <div className={styles.editorContainer}>
            <MarkdownEditor
              theme={theme}
              viewMode={viewMode}
              markdownContent={sampleMarkdown}
              activeUsers={initialUsers}
            />
            <MarkdownPreview theme={theme} viewMode={viewMode} />
          </div>

          <StatusBar
            theme={theme}
            activeFile={activeFile}
            activeUsers={initialUsers}
            viewMode={viewMode}
            toggleViewMode={toggleViewMode}
          />
        </main>

        <RightSidebar theme={theme} activeUsers={initialUsers} />
      </div>
    </div>
  );
}
