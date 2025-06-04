import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faChevronDown,
  faChevronRight,
  faFolder,
  faPlus,
  faFolderPlus,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FileNode } from "app/(route)/edit/_types/edit.type";
import { ReadingFile } from "app/_types/readingFile";
import { useReadingFileStore } from "app/_store/readingFileStore";

interface SidebarProps {
  theme: "light" | "dark";
  fileStructure: Record<
    string,
    { type: "file" | "folder"; parent: string | null }
  >;
  activeFile: string;
  openFile: (path: string) => void;
  openFiles: string[];
  setOpenFiles: (paths: string[]) => void;
  expandedFolders: string[];
  setExpandedFolders: (folders: string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  theme,
  fileStructure,
  activeFile,
  openFile,
  expandedFolders,
  setExpandedFolders,
}) => {
  const [tree, setTree] = useState<FileNode | null>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const { selectedFile, setSelectedFile } = useReadingFileStore();
  const handleOpenFolder = async () => {
    const result = await window.ipc.invoke('open-folder-recursive');
    
    if (result) setTree(result);
    setSelectedFile(null);
  };

  const toggleFolder = (path: string) => {
    setOpenFolders(prev => {
      const newSet = new Set(prev);
      newSet.has(path) ? newSet.delete(path) : newSet.add(path);
      return newSet;
    });
  };

  const handleFileClick = async (filePath: string) => {
    const result = await window.ipc.invoke('read-file', filePath);
    if (result.success) {
      setSelectedFile({ path: filePath, content: result.content });
    } else {
      alert(`파일을 읽는 중 오류 발생: ${result.error}`);
    }
  };



  const renderTree = (node: FileNode, depth = 0) => {
    const isOpen = openFolders.has(node.path);
    const isTextFile = node.name.endsWith('.md') || node.name.endsWith('.txt');
     return (
      <div key={node.path} style={{ marginLeft: depth * 16 }}>
        {node.isDirectory ? (
              <div
                onClick={() => toggleFolder(node.path)} style={{ cursor: 'pointer' }}
                className={styles.folderItem}
              >
                <FontAwesomeIcon
                  icon={isOpen ? faChevronDown : faChevronRight}
                  style={{
                    fontSize: "0.75rem",
                    marginRight: "0.375rem",
                    width: "0.75rem",
                  }}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  icon={faFolder}
                  className={styles.folderIcon}
                ></FontAwesomeIcon>
                <span className="truncate">{node.name}</span>
              </div>
        ) : (
          
      <div
      key={node.name}
      onClick={isTextFile ? () => handleFileClick(node.path) : undefined}
      className={`${styles.fileItem}${
        selectedFile?.path === node.path ?
          theme === "dark"
            ? styles.activeFileDark
            : styles.activeFileLight
          :
          ""
      }`}
    >
      <FontAwesomeIcon
        icon={faFileAlt}
        style={{ marginRight: "0.5rem", color: "#3b82f6" }}
      ></FontAwesomeIcon>
      <span className="truncate">{node.name}</span>
      </div>
      )}
      {isOpen && node.children?.map(child => renderTree(child, depth + 1))}
      </div>
     )
  };

  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;

  return (
    <aside className={`${styles.sidebar} ${themeClass}`}>
      <div className={`${styles.header} ${themeClass}`}>
        <h2 className={styles.headerTitle}>작업 파일</h2>
        <div className={styles.headerButtons}>
          <button className={styles.iconButton}>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
            ></FontAwesomeIcon>
          </button>
          <button className={styles.iconButton}>
            <FontAwesomeIcon
              icon={faFolderPlus}
              style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
            ></FontAwesomeIcon>
          </button>
          <button className={styles.iconButton} onClick={handleOpenFolder}> {/* 나머지*/}
            <FontAwesomeIcon
              icon={faEllipsisH}
              style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div className={styles.fileTree}>{tree ? renderTree(tree) : "폴더를 선택해주세요."}</div>
    </aside>
  );
};

export default Sidebar;
