"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";
import { SwitchWindow } from "app/_types/switch";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();

  const test = () => {
    router.push("/edit");
  };

  const onClickLogout = () => {
    const param: SwitchWindow = {
      width: 700,
      height: 420,
      uri: "start",
      isFixed: true,
    };
    window.ipc.invoke("deleteStore", "refreshToken");
    window.ipc.send("switch-window", param);
  };

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
            <button className={styles.active} onClick={test}>
              전체
            </button>
            <button className={styles.inactive}>개인</button>
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
            <div className={styles.card} key={i}>
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
