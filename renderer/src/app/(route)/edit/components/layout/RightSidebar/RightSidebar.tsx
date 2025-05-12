import React from "react";
import styles from "./RightSidebar.module.css";

interface User {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface RightSidebarProps {
  theme: "light" | "dark";
  activeUsers: User[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ theme, activeUsers }) => {
  const themeClass = theme === "dark" ? styles.darkTheme : styles.lightTheme;

  return (
    <div className={`${styles.container} ${themeClass}`}>
      <div className={styles.sidebar}>
        <button className={styles.sidebarButton}>
          <i className="fas fa-comments"></i>
        </button>
        <button
          className={`${styles.sidebarButton} ${styles.sidebarButtonActive}`}
        >
          <i className="fas fa-history"></i>
        </button>
        <button className={styles.sidebarButton}>
          <i className="fas fa-cog"></i>
        </button>
        <button className={styles.sidebarButton}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className={`${styles.panel} ${styles.panelBorder}`}>
        <div className={styles.panelHeader}>
          <h3>변경 기록</h3>
          <button className={styles.closeButton}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.scrollArea}>
          <div className={styles.section}>
            <h4>오늘</h4>
            <div className="space-y-4">
              {[0, 1].map((i) => (
                <div key={i} className={styles.changeEntry}>
                  <img
                    src={activeUsers[i].avatar}
                    alt={activeUsers[i].name}
                    className={styles.avatar}
                  />
                  <div className={styles.entryContent}>
                    <div className={styles.entryHeader}>
                      <span className={styles.userName}>
                        {activeUsers[i].name}
                      </span>
                      <span className={styles.entryTime}>
                        {i === 0 ? "오후 3:24" : "오후 2:15"}
                      </span>
                    </div>
                    <p className={styles.entryText}>
                      {i === 0
                        ? "README.md 파일의 '주요 기능' 섹션을 업데이트했습니다."
                        : "프로젝트 구조를 재구성했습니다."}
                    </p>
                    <button className={styles.viewButton}>
                      변경 내용 보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h4>어제</h4>
            <div className={styles.changeEntry}>
              <img
                src={activeUsers[2].avatar}
                alt={activeUsers[2].name}
                className={styles.avatar}
              />
              <div className={styles.entryContent}>
                <div className={styles.entryHeader}>
                  <span className={styles.userName}>{activeUsers[2].name}</span>
                  <span className={styles.entryTime}>오후 5:30</span>
                </div>
                <p className={styles.entryText}>API 문서를 추가했습니다.</p>
                <button className={styles.viewButton}>변경 내용 보기</button>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <h4>2025년 4월 21일 월요일</h4>
            <div className={styles.changeEntry}>
              <img
                src={activeUsers[0].avatar}
                alt={activeUsers[0].name}
                className={styles.avatar}
              />
              <div className={styles.entryContent}>
                <div className={styles.entryHeader}>
                  <span className={styles.userName}>{activeUsers[0].name}</span>
                  <span className={styles.entryTime}>오전 11:20</span>
                </div>
                <p className={styles.entryText}>
                  초기 프로젝트 설정을 완료했습니다.
                </p>
                <button className={styles.viewButton}>변경 내용 보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
