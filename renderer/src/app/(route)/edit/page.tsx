"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { preloadStyle } from "next/dist/server/app-render/entry-base";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import EditorTabs from "./components/domain/EditorTabs";
import MarkdownEditor from "./components/domain/MarkdownEditor";
import MarkdownPreview from "./components/domain/MarkdownPreview";
import StatusBar from "./components/layout/StatusBar";
import RightSidebar from "./components/layout/RightSidebar";
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
  return (
    <div
      className={`${styles.main} ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-800"
      }`}
    >
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

        <main className="flex-1 flex flex-col overflow-hidden">
          <EditorTabs
            theme={theme}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            openFiles={openFiles}
            setOpenFiles={setOpenFiles}
          />

          <div className="flex-1 flex overflow-hidden">
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
