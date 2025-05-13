import React from "react";
import styles from "./Header.module.css";

interface User {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  activeUsers: User[];
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, activeUsers }) => {
  return (
    <header
      className={`${styles.header} ${
        theme === "dark" ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <div className={styles.titleContainer}>
        <i className="fas fa-edit" style={{ marginRight: "0.5rem" }}></i>
        <h1 className={styles.title}>협업 텍스트 에디터</h1>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.avatars}>
          {activeUsers.map((user, index) => (
            <div
              key={user.id}
              className={styles.avatar}
              style={{
                marginLeft: index === 0 ? 0 : "-0.5rem",
                zIndex: 10 - index,
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className={`${styles.avatar}`}
                title={user.name}
              />
              <span className={styles.statusDot}></span>
            </div>
          ))}
        </div>
        <button
          onClick={toggleTheme}
          className={styles.themeButton}
          aria-label="테마 전환"
        >
          {theme === "light" ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </button>
        <div className={styles.userButton}>
          <button className={styles.userProfileButton}>
            <img
              src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20woman%20with%20long%20black%20hair%2C%20clean%20appearance%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=30&height=30&seq=currentuser&orientation=squarish"
              alt="현재 사용자"
              className={styles.profileImage}
            />
            <span>박소연</span>
            <i
              className="fas fa-chevron-down"
              style={{ fontSize: "0.75rem" }}
            ></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
