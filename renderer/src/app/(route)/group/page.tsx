"use client";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import Header from "./_components/layout/Header/Header";
import Sidebar from "./_components/layout/Sidebar/Sidebar";
import MainContent from "./_components/layout/MainContent/MainContent";
import ToastNotification from "./_components/ToastNotification";
import { FileItem } from "./_types";
import styles from "./page.module.css";
const folders = [
  { id: "문서", name: "문서", files: 5 },
  { id: "이미지", name: "이미지", files: 12 },
  { id: "프로젝트", name: "프로젝트", files: 3 },
  { id: "공유됨", name: "공유됨", files: 8 },
  { id: "아카이브", name: "아카이브", files: 2 },
];

const filesByFolder: Record<string, FileItem[]> = {
  문서: [
    {
      id: 1,
      name: "분기별 보고서.docx",
      modified: "2025-04-15",
      size: "2.4 MB",
      modifiedBy: "김민수",
    },
    {
      id: 2,
      name: "회의록_2025-04-10.docx",
      modified: "2025-04-10",
      size: "1.2 MB",
      modifiedBy: "이지은",
    },
    {
      id: 3,
      name: "프로젝트 계획서.pdf",
      modified: "2025-04-05",
      size: "3.7 MB",
      modifiedBy: "박지훈",
    },
    {
      id: 4,
      name: "마케팅 전략.pptx",
      modified: "2025-04-01",
      size: "5.1 MB",
      modifiedBy: "최수진",
    },
    {
      id: 5,
      name: "예산 계획.xlsx",
      modified: "2025-03-28",
      size: "1.8 MB",
      modifiedBy: "김민수",
    },
  ],
  이미지: [
    {
      id: 6,
      name: "로고_최종.png",
      modified: "2025-04-14",
      size: "0.8 MB",
      modifiedBy: "이지은",
    },
    {
      id: 7,
      name: "배너_디자인.jpg",
      modified: "2025-04-12",
      size: "1.5 MB",
      modifiedBy: "최수진",
    },
  ],
  프로젝트: [
    {
      id: 8,
      name: "웹사이트 리뉴얼.zip",
      modified: "2025-04-16",
      size: "15.2 MB",
      modifiedBy: "박지훈",
    },
    {
      id: 9,
      name: "모바일 앱 소스코드.zip",
      modified: "2025-04-13",
      size: "22.7 MB",
      modifiedBy: "김민수",
    },
    {
      id: 10,
      name: "API 문서.pdf",
      modified: "2025-04-08",
      size: "4.3 MB",
      modifiedBy: "이지은",
    },
  ],
  공유됨: [
    {
      id: 11,
      name: "협업 가이드라인.docx",
      modified: "2025-04-11",
      size: "1.9 MB",
      modifiedBy: "최수진",
    },
    {
      id: 12,
      name: "클라이언트 피드백.pdf",
      modified: "2025-04-09",
      size: "2.2 MB",
      modifiedBy: "박지훈",
    },
  ],
  아카이브: [
    {
      id: 13,
      name: "이전 프로젝트 백업.zip",
      modified: "2025-03-20",
      size: "45.6 MB",
      modifiedBy: "김민수",
    },
    {
      id: 14,
      name: "2024년 연간 보고서.pdf",
      modified: "2025-01-15",
      size: "8.3 MB",
      modifiedBy: "이지은",
    },
  ],
};

const activeMembers = [
  { id: 1, name: "김민수", avatar: "MS", color: "#4F46E5" },
  { id: 2, name: "이지은", avatar: "JE", color: "#10B981" },
  { id: 3, name: "박지훈", avatar: "JH", color: "#F59E0B" },
  { id: 4, name: "최수진", avatar: "SJ", color: "#EC4899" },
  { id: 5, name: "정태영", avatar: "TY", color: "#8B5CF6" },
];

export default function HomePage() {
  const [currentFolder, setCurrentFolder] = useState("문서");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [darkMode, setDarkMode] = useState(false);
  const [toastOpen, setToastOpen] = useState(true);

  useEffect(() => {
    if (typeof window === undefined) return;

    const chartDom = document.getElementById("storage-chart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      myChart.setOption({
        animation: false,
        tooltip: { trigger: "item", formatter: "{b}: {c}GB ({d}%)" },
        series: [
          {
            name: "스토리지 사용량",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: darkMode ? "#1A1A1A" : "#fff",
              borderWidth: 2,
            },
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: 35, name: "문서", itemStyle: { color: "#4F46E5" } },
              { value: 20, name: "이미지", itemStyle: { color: "#10B981" } },
              { value: 30, name: "프로젝트", itemStyle: { color: "#F59E0B" } },
              { value: 10, name: "공유됨", itemStyle: { color: "#EC4899" } },
              { value: 5, name: "아카이브", itemStyle: { color: "#8B5CF6" } },
            ],
          },
        ],
      });
      return () => myChart.dispose();
    }
  }, [darkMode]);

  return (
    <div
      className={`${styles.wrapper} ${darkMode ? styles.dark : styles.light}`}
    >
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        members={activeMembers}
      />
      <div className={styles.innerContainer}>
        <Sidebar
          darkMode={darkMode}
          sidebarOpen={sidebarOpen}
          folders={folders}
          currentFolder={currentFolder}
          onSelectFolder={setCurrentFolder}
        />
        <MainContent
          darkMode={darkMode}
          viewMode={viewMode}
          currentFolder={currentFolder}
          files={filesByFolder[currentFolder] || []}
          onToggleViewMode={() =>
            setViewMode(viewMode === "list" ? "grid" : "list")
          }
        />
      </div>
      {toastOpen && (
        <ToastNotification
          darkMode={darkMode}
          message="'분기별 보고서.docx' 파일이 김민수님에 의해 수정되었습니다."
          onClose={() => setToastOpen(false)}
        />
      )}
    </div>
  );
}
