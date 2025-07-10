"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import { SwitchWindow } from "@/_types/switch";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from '@shared/constants/storageKeys'
import { useGroups } from "@/_hooks/queries/group";

export default function HomePage() {
  const router = useRouter();

  const { data: groups, isLoading, isError, error } = useGroups();

  useEffect(() => {
    router.prefetch("/edit");
    router.prefetch("/group");
  }, []);
  const edit = () => router.push("/edit");
  const group = (groupId: string) => router.push("/group");

  const onClickLogout = () => {
    const param: SwitchWindow = {
      width: 700,
      height: 420,
      uri: "start",
      isFixed: true,
    };
    window.electronAPI.deleteStore(STORAGE_KEYS.REFRESH_TOKEN);
    window.electronAPI.switchWindow(param);
  };

  // 로딩 상태 처리: 스켈레톤 UI 또는 간단한 로딩 메시지를 보여줍니다.
  if (isLoading) {
    return <div className={styles.wrapper}>... Loading ...</div>;
  }

  // 에러 상태 처리: 에러 메시지를 보여줍니다.
  // 전역 에러 핸들러에서 공통 팝업이 뜨고, 여기서는 페이지에 특화된 UI를 보여줄 수 있습니다.
  if (isError) {
    return (
      <div className={styles.wrapper} onClick={edit}>
        <h2>Error!</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo} onClick={onClickLogout}>
          <img
            src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
            alt="MarkCollab"
          />
        </div>
        <div className={styles.icons}>
          {/* <button><FaMoon /></button> */}
          {/* <button><FaBell /><span className={styles.notiDot}></span></button> */}
          {/* <button><FaCog /></button> */}
          {/* <div className={styles.avatar}><FaUser /></div> */}
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <button className={styles.active} onClick={edit}>
              전체
            </button>
            <button className={styles.inactive} >
              개인
            </button>
            <button className={styles.inactive}>그룹</button>
            <button className={styles.inactive}>즐겨찾기</button>
          </div>
          <div className={styles.actions}>
            <div className={styles.searchBox}>
              {/* <FaSearch className={styles.searchIcon} /> */}
              <input placeholder="워크스페이스 검색" />
            </div>
            {/* <button><FaThLarge /></button> */}
            {/* <button><FaList /></button> */}
            <select>
              <option>최근 수정순</option>
              <option>제목순</option>
              <option>생성일순</option>
            </select>
            <button className={styles.newButton}>
              {/* <FaPlus /> */}새 워크스페이스
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {[1, 2, 3, 4].map((_, i) => (
            <div className={styles.card} key={i} onClick={() => group('')}>
              <div className={styles.cardHeader}>
                <span className={styles.tag}>
                  {i % 2 === 0 ? "그룹" : "개인"}
                </span>
                {/* <button><FaStar /></button> */}
              </div>
              <h3>제목 {i + 1}</h3>
              <p>설명 {i + 1}</p>
              <div className={styles.cardFooter}>
                <div className={styles.members}></div>
                <span>{i + 1}일 전 수정</span>
              </div>
            </div>
          ))}

          {groups?.map((groupData) => (
            <div className={styles.card} key={groupData.id} onClick={() => group(groupData.id)}>
              <div className={styles.cardHeader}>
                <span className={styles.tag}>
                  {/* 실제 데이터에 따라 태그를 표시할 수 있습니다. 예시: */}
                  {groupData.owner.displayName ? "그룹" : "개인"}
                </span>
                {/* <button><FaStar /></button> */}
              </div>
              <h3>{groupData.name}</h3>
              <p>{groupData.description || '설명이 없습니다.'}</p>
              <div className={styles.cardFooter}>
                <div className={styles.members}>
                  {/* 멤버 아바타 표시 로직 (예시) */}
                </div>
                {/* date-fns 라이브러리를 사용해 날짜 포맷팅 */}
                <span>
                  {new Date(groupData.updatedAt).toLocaleString()} 수정
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          {/* <button><FaChevronLeft /></button> */}
          <button className={styles.pageActive}>1</button>
          <button>2</button>
          <button>3</button>
          {/* <button><FaChevronRight /></button> */}
        </div>
      </div>
    </div>
  );
}
