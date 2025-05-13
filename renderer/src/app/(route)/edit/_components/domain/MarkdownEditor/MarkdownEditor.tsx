import React from "react";
import styles from "./MarkdownEditor.module.css";

interface User {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface MarkdownEditorProps {
  theme: "light" | "dark";
  viewMode: "edit" | "preview";
  markdownContent: string;
  activeUsers: User[];
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  theme,
  viewMode,
  markdownContent,
  activeUsers,
}) => {
  if (viewMode !== "edit") return null;

  return (
    <div className={styles.container}>
      {activeUsers.slice(0, 2).map((user, idx) => {
        const topClass = idx === 0 ? styles.top20 : styles.top32;
        const leftClass = idx === 0 ? styles.left24 : styles.left40;

        return (
          <div
            key={user.id}
            className={`${styles.cursorGroup} ${topClass} ${leftClass} group`}
          >
            <div className={styles.cursorBarWrapper}>
              <div
                className={styles.cursorBar}
                style={{ backgroundColor: user.color }}
              ></div>
              <div
                className={styles.cursorPing}
                style={{ backgroundColor: user.color }}
              ></div>
              <div className={styles.userInfo}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.avatar}
                />
                <span
                  className={styles.usernameTag}
                  style={{ backgroundColor: user.color }}
                >
                  {user.name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <pre
        className={`${styles.preview} ${
          theme === "dark" ? styles.dark : styles.light
        }`}
      >
        {markdownContent}
      </pre>
    </div>
  );
};

export default MarkdownEditor;
