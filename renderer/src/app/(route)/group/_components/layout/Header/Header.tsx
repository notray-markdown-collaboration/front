import styles from "./Header.module.css";
import { Member } from "../../../_types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUsers,
  faSearch,
  faBell,
  faMoon,
  faSun,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useSettingsStore } from "@/_store/settingStore";
import SettingsModal from "../../SettingsModal";

interface HeaderProps {
  darkMode: boolean;
  onToggleSidebar: () => void;
  onToggleDarkMode: () => void;
  members: Member[];
}

export default function Header({
  darkMode,
  onToggleSidebar,
  onToggleDarkMode,
  members,
}: HeaderProps) {
  const openSetting = useSettingsStore((s) => s.open);

  return (
    <header
      className={`${styles.header} ${
        darkMode ? styles.headerDark : styles.headerLight
      }`}
    >
      <div className={styles.leftSection}>
        <button onClick={onToggleSidebar} className={styles.iconButton}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={styles.teamInfo}>
          <div
            className={`${styles.teamIcon} ${
              darkMode ? styles.bgBlue600 : styles.bgBlue500
            }`}
          >
            <FontAwesomeIcon icon={faUsers} className={styles.iconWhite} />
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
          <FontAwesomeIcon icon={faSearch} className={styles.iconGray} />
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
          <FontAwesomeIcon icon={faBell} />
          <span className={styles.notificationDot}></span>
        </button>

        <button onClick={onToggleDarkMode} className={styles.iconButton}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>

        <button onClick={openSetting} className={styles.iconButton}>
          <FontAwesomeIcon icon={faCog} />
        </button>
        <SettingsModal />
      </div>
    </header>
  );
}
