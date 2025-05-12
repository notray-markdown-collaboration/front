import React from "react";
import styles from "./Header.module.css";
import { Member } from "../types";

interface HeaderProps {
  darkMode: boolean;
  onToggleSidebar: () => void;
  onToggleDarkMode: () => void;
  members: Member[];
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleSidebar,
  onToggleDarkMode,
  members,
}) => {
  return (
    <header
      className={`${styles.header} ${
        darkMode ? styles.headerDark : styles.headerLight
      }`}
    >
      <div className={styles.leftSection}>
        <button onClick={onToggleSidebar} className={styles.iconButton}>
          <i className="fas fa-bars"></i>
        </button>
        <div className={styles.teamInfo}>
          <div
            className={`${styles.teamIcon} ${
              darkMode ? styles.bgBlue600 : styles.bgBlue500
            }`}
          >
            <i className="fas fa-users text-white"></i>
          </div>
          <h1 className={styles.teamTitle}>디자인 팀 워크스페이스</h1>
        </div>
      </div>

      <div
        className={`${styles.searchBox} ${
          darkMode ? styles.searchBoxDark : styles.searchBoxLight
        }`}
      >
        <div className={styles.searchIcon}>
          <i className="fas fa-search text-gray-400"></i>
        </div>
        <input
          type="text"
          className={`${styles.searchInput} ${
            darkMode ? styles.inputDark : styles.inputLight
          }`}
          placeholder="파일 검색..."
        />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.memberGroup}>
          {members.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className={`${styles.memberBadge} ${
                darkMode ? styles.memberBorderDark : styles.memberBorderLight
              }`}
              style={{ backgroundColor: member.color }}
              title={member.name}
            >
              {member.avatar}
            </div>
          ))}
          {members.length > 3 && (
            <div
              className={`${styles.memberMore} ${
                darkMode ? styles.bgDark : styles.bgLight
              }`}
            >
              +{members.length - 3}
            </div>
          )}
        </div>

        <button className={styles.iconButton}>
          <i className="fas fa-bell"></i>
          <span className={styles.notificationDot}></span>
        </button>

        <button onClick={onToggleDarkMode} className={styles.iconButton}>
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>

        <button className={styles.iconButton}>
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
