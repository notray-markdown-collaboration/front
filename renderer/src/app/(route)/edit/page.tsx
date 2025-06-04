"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Header from "./_components/layout/Header/Header";
import Sidebar from "./_components/layout/Sidebar/Sidebar";
import EditorTabs from "./_components/domain/EditorTabs/EditorTabs";
import MarkdownPreview from "./_components/domain/MarkdownPreview/MarkdownPreview";
import StatusBar from "./_components/layout/StatusBar/StatusBar";
import RightSidebar from "./_components/layout/RightSidebar/RightSidebar";
import {
  fileStructure,
  initialUsers,
  sampleMarkdown,
} from "./_utils/constants";
import MarkdownEditor from "../editTest/page";

export default function HomePage() {
  const [activeFile, setActiveFile] = useState("README.md");

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
        />

        <main className={styles.mainContent}>
          <EditorTabs
            theme={theme}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
          />

          <div className={styles.editorContainer}>
            <MarkdownEditor />
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
