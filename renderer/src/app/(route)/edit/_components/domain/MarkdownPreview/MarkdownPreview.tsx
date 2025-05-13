import React from "react";
import styles from "./MarkdownPreview.module.css";

interface MarkdownPreviewProps {
  theme: "light" | "dark";
  viewMode: "edit" | "preview";
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  theme,
  viewMode,
}) => {
  if (viewMode !== "preview") return null;

  const themeClass = theme === "dark" ? styles.dark : styles.light;

  return (
    <div className={`${styles.container} ${themeClass}`}>
      <div className={styles.proseWrapper}>
        <h1>프로젝트 개요</h1>
        <h2>소개</h2>
        <p>
          이 프로젝트는 협업 마크다운 에디터입니다. 팀원들과 함께 문서를
          실시간으로 편집할 수 있습니다.
        </p>
        <h2>주요 기능</h2>
        <ul>
          <li>실시간 협업 편집</li>
          <li>마크다운 문법 지원</li>
          <li>파일 트리 구조</li>
          <li>다크/라이트 모드</li>
        </ul>
        <h2>설치 방법</h2>
        <pre className={styles.codeBlock}>
          <code>
            npm install
            <br />
            npm start
          </code>
        </pre>
        <h2>사용 방법</h2>
        <ol>
          <li>계정 생성 또는 로그인</li>
          <li>프로젝트 생성 또는 참여</li>
          <li>파일 편집 시작</li>
        </ol>
        <div className={styles.imageContainer}>
          <img
            src="https://readdy.ai/api/search-image?query=screenshot%20of%20a%20modern%20markdown%20editor%20interface%20with%20collaboration%20features%2C%20showing%20multiple%20cursors%20and%20user%20avatars%2C%20clean%20design%20with%20code%20blocks%20and%20formatting&width=600&height=400&seq=editor&orientation=landscape"
            alt="예시 이미지"
            className={styles.previewImage}
          />
        </div>
        <h2>담당자</h2>
        <ul>
          <li>프론트엔드: 김민수</li>
          <li>백엔드: 이지연</li>
          <li>디자인: 박준호</li>
        </ul>
      </div>
    </div>
  );
};

export default MarkdownPreview;
