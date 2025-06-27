import React from "react";
import styles from "./SettingsModal.module.css"; // CSS Modules 스타일 연결
import { useSettingsStore } from "@/_store/settingStore";

interface SettingsModalProps {
  isOpen: boolean;
  isDarkMode: boolean;
  activeTab: string;
  shareLink: string;
  linkValidity: string;
  onClose: () => void;
  onTabClick: (tab: string) => void;
  onCopy: () => void;
  onValidityChange: (validity: string) => void;
  onResetLink: () => void;
  onGenerateLink: () => void;
}

const SettingsModal: React.FC/* <SettingsModalProps> */ = (/* {
  isOpen,
  isDarkMode,
  activeTab,
  shareLink,
  linkValidity,
  onClose,
  onTabClick,
  onCopy,
  onValidityChange,
  onResetLink,
  onGenerateLink,
} */) => {
    const {
    isOpen,
    isDarkMode,
    activeTab,
    shareLink,
    linkValidity,
    close,
    setTab,
    setLinkValidity,
    copyLink,
    resetLink,
    generateNewLink,
  } = useSettingsStore();

  if (!isOpen) return null;

  const tabs = ["공유", "알림", "멤버", "보안", "일반"];
  const icons: Record<string, string> = {
    공유: "share-alt",
    알림: "bell",
    멤버: "users",
    보안: "shield-alt",
    일반: "cog",
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${isDarkMode ? styles.dark : styles.light}`}>
        {/* 왼쪽 탭 */}
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <h2>설정</h2>
            <button onClick={close}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className={styles.tabList}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
                onClick={() => setTab(tab)}
              >
                <i className={`fas fa-${icons[tab]}`} />
                <span>{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className={styles.content}>
          {activeTab === "공유" && (
            <div>
              <h3>공유 링크</h3>
              <div className={styles.inputGroup}>
                <input type="text" readOnly value={shareLink} />
                <button onClick={copyLink}>복사</button>
              </div>
              <p>이 링크를 가진 사람은 누구나 문서에 접근할 수 있습니다.</p>

              <h4>링크 유효기간</h4>
              {["무제한", "1일", "7일", "1달"].map((v) => (
                <label key={v} className={styles.radio}>
                  <input
                    type="radio"
                    checked={linkValidity === v}
                    onChange={() => setLinkValidity(v)}
                  />
                  {v}
                </label>
              ))}

              <h4>접근 권한</h4>
              <label className={styles.radio}>
                <input type="radio" checked readOnly />
                보기만 가능
              </label>
              <label className={styles.radio}>
                <input type="radio" readOnly />
                편집 가능
              </label>

              <div className={styles.footer}>
                <button className={styles.danger} onClick={resetLink}>
                  링크 초기화
                </button>
                <button className={styles.primary} onClick={generateNewLink}>
                  새 링크 생성
                </button>
              </div>
            </div>
          )}

          {activeTab !== "공유" && (
            <div>
              <h3>{activeTab} 설정</h3>
              <p>{activeTab} 탭 내용이 여기에 표시됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
