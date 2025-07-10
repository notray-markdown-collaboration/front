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
import { FileNode } from "@/(route)/edit/_types/edit.type";
import { useReadingFileStore } from "@/_store/readingFileStore";

interface SidebarProps {
  theme: "light" | "dark";
}

const Sidebar: React.FC<SidebarProps> = ({
  theme,
}) => {
  const [tree, setTree] = useState<FileNode | null>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  // ✨ 생성 상태 관리
  const [creationState, setCreationState] = useState<{ mode: 'file' | 'folder' } | null>(null);
  const [newItemName, setNewItemName] = useState('');

  const { selectedFile, setSelectedFile, targetUrl, setTargetUrl } = useReadingFileStore();
  const handleOpenFolder = async () => {
    const result = await window.electronAPI.openFolderDialog();
    // console.log(result);
    if (result) setTree(result);
    setTargetUrl(String(result?.path));
    setSelectedFile(null);
  };

  const toggleFolder = (path: string) => {
    setTargetUrl(path);
    setOpenFolders(prev => {
      const newSet = new Set(prev);
      newSet.has(path) ? newSet.delete(path) : newSet.add(path);
      return newSet;
    });
  };

  const handleFileClick = async (filePath: string) => {
    const result = await window.electronAPI.readFile(filePath);

    if (result.success) {
      setSelectedFile({ path: filePath, content: result.content! });
    } else {
      alert(`파일을 읽는 중 오류 발생: ${result.error}`);
    }
  };

  // ✨ 파일 트리 새로고침 함수
  const refreshFileTree = async () => {
    if (!tree) return;
    const refreshedTree = await window.electronAPI.readFolderTree(tree.path);
    if (refreshedTree) {
      setTree(refreshedTree);
    }
  };

  // ✨ 생성 확인 핸들러
  const handleConfirmCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !creationState || !targetUrl) return;

    const newPath = `${targetUrl}/${newItemName}`;
    const { mode } = creationState;
    let result;

    if (mode === 'file') {
      result = await window.electronAPI.createFile(newPath);
    } else { // 'folder'
      result = await window.electronAPI.createFolder(newPath);
    }

    if (result.success) {
      await refreshFileTree();
    } else {
      alert(`${mode === 'file' ? '파일' : '폴더'} 생성 실패: ${result.error}`);
    }

    setCreationState(null);
    setNewItemName('');
  };

  // ✨ 생성 취소 핸들러
  const handleCancelCreation = () => {
    setCreationState(null);
    setNewItemName('');
  };

  // ✨ 생성 모드 시작 핸들러
  const startCreation = (mode: 'file' | 'folder') => {
    if (!targetUrl) return;
    // 타겟 폴더가 닫혀있으면 열어줌
    if (!openFolders.has(targetUrl)) {
      setOpenFolders(prev => new Set(prev).add(targetUrl));
    }
    setCreationState({ mode });
    setNewItemName('');
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

      {isOpen && creationState && targetUrl === node.path && (
        <div style={{ marginLeft: (depth + 1) * 16 }} className={styles.creationFormInline}>
          <form onSubmit={handleConfirmCreation}>
            <FontAwesomeIcon icon={creationState.mode === 'file' ? faFileAlt : faFolder} className={styles.creationIcon} />
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onBlur={handleCancelCreation}
              className={styles.creationInputInline}
              autoFocus
            />
          </form>
        </div>
      )}
      </div>
     )
  };

  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;

  return (
    <aside className={`${styles.sidebar} ${themeClass}`}>
      <div className={`${styles.header} ${themeClass}`}>
        <h2 className={styles.headerTitle}>작업 파일</h2>
        <div className={styles.headerButtons}>
          <button className={styles.iconButton} onClick={() => startCreation('file')} disabled={!targetUrl}>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
            ></FontAwesomeIcon>
          </button>
          <button className={styles.iconButton} onClick={() => startCreation('folder')} disabled={!targetUrl}>
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
