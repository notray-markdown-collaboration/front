"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { preloadStyle } from "next/dist/server/app-render/entry-base";

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
  // 샘플 파일 구조
  const fileStructure = {
    "README.md": { type: "file", parent: null },
    "package.json": { type: "file", parent: null },
    docs: { type: "folder", parent: null },
    src: { type: "folder", parent: null },
    "docs/api.md": { type: "file", parent: "docs" },
    "docs/guide.md": { type: "file", parent: "docs" },
    "src/components": { type: "folder", parent: "src" },
    "src/pages": { type: "folder", parent: "src" },
    "src/components/Button.tsx": { type: "file", parent: "src/components" },
    "src/components/Sidebar.tsx": { type: "file", parent: "src/components" },
    "src/pages/index.tsx": { type: "file", parent: "src/pages" },
    "project.md": { type: "file", parent: null },
    "tasks.md": { type: "file", parent: null },
  };
  // 현재 협업 중인 사용자
  const activeUsers = [
    {
      id: 1,
      name: "김민수",
      color: "#FF5733",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20man%20with%20short%20black%20hair%2C%20clean%20cut%20appearance%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=40&height=40&seq=user1&orientation=squarish",
    },
    {
      id: 2,
      name: "이지연",
      color: "#33A1FF",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20woman%20with%20medium%20length%20black%20hair%2C%20clean%20appearance%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=40&height=40&seq=user2&orientation=squarish",
    },
    {
      id: 3,
      name: "박준호",
      color: "#33FF57",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20man%20with%20glasses%2C%20short%20black%20hair%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=40&height=40&seq=user3&orientation=squarish",
    },
  ];
  // 마크다운 샘플 콘텐츠
  const markdownContent = `# 텍스트 에디터 소개
## 개요
이 텍스트 에디터는 실시간 협업 기능을 갖춘 강력한 편집 도구입니다. 팀원들과 함께 문서를 실시간으로 편집하고 공유할 수 있습니다.
## 주요 기능
- 실시간 협업 편집
- 마크다운 문법 지원
- 파일 트리 구조
- 다크/라이트 모드
## 설치 방법
\`\`\`bash
npm install
npm start
\`\`\`
## 사용 방법
1. 계정 생성 또는 로그인
2. 프로젝트 생성 또는 참여
3. 파일 편집 시작
![예시 이미지](https://example.com/image.jpg)
## 담당자
- 프론트엔드: 김민수
- 백엔드: 이지연
- 디자인: 박준호
`;
  return (
    <div className={styles.main}>
      {/* 상단 헤더 */}
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <i className="fas fa-edit mr-2"></i>
          <h1 className={styles.title}>협업 텍스트 에디터</h1>
        </div>
        <div className={styles.userContainer}>
          <div className={styles.profileContainer}>
            {activeUsers.map((user, index) => (
              <div
                key={user.id}
                className={styles.profile}
                style={{ zIndex: 10 - index }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.profileImg}
                  title={user.name}
                />
                <span className={styles.profileImgSpan}></span>
              </div>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className={styles.switchingDarkmodeBtn}
            aria-label="테마 전환"
          >
            {theme === "light" ? (
              <i className="fas fa-moon"></i>
            ) : (
              <i className="fas fa-sun"></i>
            )}
          </button>
          <div className={styles.usingContainer}>
            <button className={styles.profileBtn}>
              <img
                src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20woman%20with%20long%20black%20hair%2C%20clean%20appearance%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=30&height=30&seq=currentuser&orientation=squarish"
                alt="현재 사용자"
                className={styles.profileBtnImg}
              />
              <span>박소연</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
          </div>
        </div>
      </header>
      <div className={styles.treeContainer}>
        {/* 좌측 파일 트리 사이드바 */}
        <aside className={styles.treeInner}>
          <div className={styles.treeHeaderContainer}>
            <h2 className={styles.treeHeaderTitle}>작업 파일</h2>
            <div className={styles.treeHeaderEvent}>
              <button className={styles.treeHeaderIcon}>
                <i className="fas fa-plus text-xs"></i>
              </button>
              <button className={styles.treeHeaderIcon}>
                <i className="fas fa-folder-plus text-xs"></i>
              </button>
              <button className={styles.treeHeaderIcon}>
                <i className="fas fa-ellipsis-h text-xs"></i>
              </button>
            </div>
          </div>
          <div className={styles.fileContainer}>
            {/* 루트 레벨 파일 및 폴더 */}
            {Object.entries(fileStructure)
              .filter(([path, info]) => info.parent === null)
              .map(([path, info]) => {
                if (info.type === "file") {
                  return (
                    <div
                      key={path}
                      onClick={() => openFile(path)}
                      className={`${styles.folderContainer} ${
                        activeFile === path
                          ? styles.choiceFolder
                          : styles.notChoiceFolder
                      }`}
                    >
                      <i className="fas fa-file-alt mr-2 text-blue-500"></i>
                      <span className={styles.folderText}>{path}</span>
                    </div>
                  );
                } else {
                  const isExpanded = expandedFolders.includes(path);
                  return (
                    <div key={path}>
                      <div
                        onClick={() => toggleFolder(path)}
                        className={styles.toggleFolder}
                      >
                        <i
                          className={`fas ${
                            isExpanded ? "fa-chevron-down" : "fa-chevron-right"
                          } text-xs mr-1.5 w-3`}
                        ></i>
                        <i className="fas fa-folder mr-2 text-yellow-500"></i>
                        <span className={styles.toggleFolderText}>{path}</span>
                      </div>
                      {isExpanded && (
                        <div className={styles.childrenFolder}>
                          {/* 하위 파일 및 폴더 */}
                          {Object.entries(fileStructure)
                            .filter(
                              ([childPath, childInfo]) =>
                                childInfo.parent === path
                            )
                            .map(([childPath, childInfo]) => {
                              if (childInfo.type === "file") {
                                return (
                                  <div
                                    key={childPath}
                                    onClick={() => openFile(childPath)}
                                    className={`${styles.childInfoFile} ${
                                      activeFile === childPath
                                        ? styles.choiceChildInfoFile
                                        : ""
                                    }`}
                                  >
                                    <i className="fas fa-file-alt mr-2 text-blue-500"></i>
                                    <span className={styles.childInfoFileText}>
                                      {childPath.split("/").pop()}
                                    </span>
                                  </div>
                                );
                              } else {
                                const isChildExpanded =
                                  expandedFolders.includes(childPath);
                                return (
                                  <div key={childPath}>
                                    <div
                                      onClick={() => toggleFolder(childPath)}
                                      className={styles.childInfoFolder}
                                    >
                                      <i
                                        className={`fas ${
                                          isChildExpanded
                                            ? "fa-chevron-down"
                                            : "fa-chevron-right"
                                        } text-xs mr-1.5 w-3`}
                                      ></i>
                                      <i className="fas fa-folder mr-2 text-yellow-500"></i>
                                      <span
                                        className={styles.childInfoFolderText}
                                      >
                                        {childPath.split("/").pop()}
                                      </span>
                                    </div>
                                    {isChildExpanded && (
                                      <div
                                        className={
                                          styles.childInfoFolderContainer
                                        }
                                      >
                                        {Object.entries(fileStructure)
                                          .filter(
                                            ([
                                              grandChildPath,
                                              grandChildInfo,
                                            ]) =>
                                              grandChildInfo.parent ===
                                              childPath
                                          )
                                          .map(
                                            ([
                                              grandChildPath,
                                              grandChildInfo,
                                            ]) => (
                                              <div
                                                key={grandChildPath}
                                                onClick={() =>
                                                  openFile(grandChildPath)
                                                }
                                                className={`${
                                                  styles.grandChildx2Path
                                                } ${
                                                  activeFile === grandChildPath
                                                    ? styles.choiceGrandChildx2Path
                                                    : ""
                                                }`}
                                              >
                                                <i
                                                  className={`fas ${
                                                    grandChildPath.endsWith(
                                                      ".tsx"
                                                    )
                                                      ? "fa-file-code"
                                                      : "fa-file-alt"
                                                  } mr-2 ${
                                                    grandChildPath.endsWith(
                                                      ".tsx"
                                                    )
                                                      ? "text-purple-500"
                                                      : "text-blue-500"
                                                  }`}
                                                ></i>
                                                <span
                                                  className={
                                                    styles.grandChildx2PathText
                                                  }
                                                >
                                                  {grandChildPath
                                                    .split("/")
                                                    .pop()}
                                                </span>
                                              </div>
                                            )
                                          )}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            })}
                        </div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
        </aside>
        {/* 우측 에디터 영역 */}
        <main className={styles.editerContainer}>
          {/* 탭 바 */}
          <div className={styles.editerTabBar}>
            {openFiles.map((file) => (
              <div
                key={file}
                onClick={() => setActiveFile(file)}
                className={`${styles.editerTabBarFile} ${
                  activeFile === file
                    ? styles.choiceEditerTabBarFile
                    : styles.notChoiceEditerTabBarFile
                }`}
              >
                <i
                  className={`fas ${
                    file.endsWith(".tsx") ? "fa-file-code" : "fa-file-alt"
                  } mr-2 ${
                    file.endsWith(".tsx") ? "text-purple-500" : "text-blue-500"
                  }`}
                ></i>
                <span className={styles.fileText}>{file.split("/").pop()}</span>
                <button
                  onClick={(e) => closeFile(file, e)}
                  className={styles.closeIcon}
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            ))}
          </div>
          {/* 에디터 영역 */}
          <div className={styles.realEditor}>
            {/* 에디터 */}
            <div
              className={styles.realEditorContainer}
              style={
                viewMode === "edit"
                  ? { display: "block" }
                  : { display: "hidden" }
              }
            >
              <div className={styles.realEditorContainerInner}>
                {/* 다른 사용자의 커서 위치 표시 */}
                <div className={styles.realEditorCuser}>
                  <div className={styles.realEditorCuserInner}>
                    <div className={styles.realEditorCuserInner2}>
                      <div
                        className={styles.realEditorCuserAnimetion}
                        style={{ backgroundColor: activeUsers[0].color }}
                      ></div>
                      <div
                        className={styles.realEditorCuserAnimetionPing}
                        style={{ backgroundColor: activeUsers[0].color }}
                      ></div>
                    </div>
                    <div className={styles.realEditorCuserProfileContainer}>
                      <img
                        src={activeUsers[0].avatar}
                        alt={activeUsers[0].name}
                        className={styles.realEditorCuserProfile}
                      />
                      <span
                        className={styles.realEditorCuserProfileName}
                        style={{ backgroundColor: activeUsers[0].color }}
                      >
                        {activeUsers[0].name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.userCursorWrapper}>
                  <div className={styles.flexRow}>
                    <div className={styles.relative}>
                      <div
                        className={styles.cursorBar}
                        style={{ backgroundColor: activeUsers[1].color }}
                      ></div>
                      <div
                        className={styles.cursorDot}
                        style={{ backgroundColor: activeUsers[1].color }}
                      ></div>
                    </div>
                    <div className={styles.userInfo}>
                      <img
                        src={activeUsers[1].avatar}
                        alt={activeUsers[1].name}
                        className={styles.avatar}
                      />
                      <span
                        className={styles.nameTag}
                        style={{ backgroundColor: activeUsers[1].color }}
                      >
                        {activeUsers[1].name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 에디터 콘텐츠 */}
                <pre className={styles.mainEditor}>{markdownContent}</pre>
              </div>
            </div>
            {/* 미리보기 */}
            <div
              className={styles.viewContainer}
              style={
                viewMode === "preview"
                  ? { display: "block" }
                  : { display: "hidden" }
              }
            >
              asdasd
            </div>
          </div>
          {/* 하단 상태 바 */}
          <div className={styles.bottomContainer}>
            <div className={styles.bottomContainerInner}>
              <span>{activeFile}</span>
              <span>마크다운</span>
              <span>UTF-8</span>
            </div>
            <div className={styles.teamContainer}>
              <div className={styles.teamContainerInner}>
                <span>협업자:</span>
                {activeUsers.map((user) => (
                  <div
                    key={user.id}
                    className={styles.userContainer}
                    title={user.name}
                  >
                    <span
                      className={styles.userText}
                      style={{ backgroundColor: user.color }}
                    ></span>
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
              <button onClick={toggleViewMode} className={styles.viewBtn}>
                <i
                  className={`fas ${
                    viewMode === "edit" ? "fa-eye" : "fa-edit"
                  }`}
                ></i>
                <span>{viewMode === "edit" ? "미리보기" : "편집"}</span>
              </button>
            </div>
          </div>
        </main>
        {/* 우측 사이드바 */}
        <div
          className={`${styles.flex} ${styles.borderLeft} ${styles.bgPanel}`}
        >
          <div
            className={`${styles.w10} ${styles.flexCol} ${styles.itemsCenter} ${styles.py4}`}
          >
            <button
              className={`${styles.p2} ${styles.mb4} ${styles.rounded} ${styles.cursorPointer} ${styles.roundedButton} ${styles.nowrap} ${styles.hoverBg}`}
            >
              <i className="fas fa-comments"></i>
            </button>
            <button
              className={`${styles.p2} ${styles.mb4} ${styles.rounded} ${styles.cursorPointer} ${styles.roundedButton} ${styles.nowrap} ${styles.hoverBg}`}
            >
              <i className="fas fa-history"></i>
            </button>
            <button
              className={`${styles.p2} ${styles.mb4} ${styles.rounded} ${styles.cursorPointer} ${styles.roundedButton} ${styles.nowrap} ${styles.hoverBg}`}
            >
              <i className="fas fa-cog"></i>
            </button>
            <button
              className={`${styles.p2} ${styles.rounded} ${styles.cursorPointer} ${styles.roundedButton} ${styles.nowrap} ${styles.hoverBg}`}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className={`${styles.w80} ${styles.borderLeft}`}>
            <div
              className={`${styles.p4} ${styles.borderBottom} ${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter}`}
            >
              <h3 className={styles.fontMedium}>변경 기록</h3>
              <button
                className={`${styles.p15} ${styles.rounded} ${styles.hoverBg} ${styles.roundedButton} ${styles.nowrap}`}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className={`${styles.overflowYAuto} ${styles.panelHeight}`}>
              {/* 변경 기록 내용 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
