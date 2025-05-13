// components/RightSidebar.tsx
import React from "react";

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
  return (
    <div
      className={`flex border-l ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="w-10 flex flex-col items-center py-4">
        <button className="p-2 mb-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-comments"></i>
        </button>
        <button className="p-2 mb-4 rounded bg-gray-200 dark:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-history"></i>
        </button>
        <button className="p-2 mb-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-cog"></i>
        </button>
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div
        className={`w-80 border-l ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">변경 기록</h3>
          <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 !rounded-button whitespace-nowrap">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-8.5rem)]">
          <div className="p-4 border-b">
            <h4 className="text-sm text-gray-500 mb-3">오늘</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img
                  src={activeUsers[0].avatar}
                  alt={activeUsers[0].name}
                  className="w-8 h-8 rounded-full mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{activeUsers[0].name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      오후 3:24
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    README.md 파일의 '주요 기능' 섹션을 업데이트했습니다.
                  </p>
                  <button className="mt-2 text-sm text-blue-500 hover:text-blue-600 !rounded-button whitespace-nowrap">
                    변경 내용 보기
                  </button>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <img
                  src={activeUsers[1].avatar}
                  alt={activeUsers[1].name}
                  className="w-8 h-8 rounded-full mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{activeUsers[1].name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      오후 2:15
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    프로젝트 구조를 재구성했습니다.
                  </p>
                  <button className="mt-2 text-sm text-blue-500 hover:text-blue-600 !rounded-button whitespace-nowrap">
                    변경 내용 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-b">
            <h4 className="text-sm text-gray-500 mb-3">어제</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img
                  src={activeUsers[2].avatar}
                  alt={activeUsers[2].name}
                  className="w-8 h-8 rounded-full mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{activeUsers[2].name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      오후 5:30
                    </span>
                  </div>
                  <p className="text-sm mt-1">API 문서를 추가했습니다.</p>
                  <button className="mt-2 text-sm text-blue-500 hover:text-blue-600 !rounded-button whitespace-nowrap">
                    변경 내용 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h4 className="text-sm text-gray-500 mb-3">
              2025년 4월 21일 월요일
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img
                  src={activeUsers[0].avatar}
                  alt={activeUsers[0].name}
                  className="w-8 h-8 rounded-full mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{activeUsers[0].name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      오전 11:20
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    초기 프로젝트 설정을 완료했습니다.
                  </p>
                  <button className="mt-2 text-sm text-blue-500 hover:text-blue-600 !rounded-button whitespace-nowrap">
                    변경 내용 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
