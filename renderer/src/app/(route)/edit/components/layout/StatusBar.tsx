// components/StatusBar.tsx
import React from "react";

interface User {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface StatusBarProps {
  theme: "light" | "dark";
  activeFile: string;
  activeUsers: User[];
  viewMode: "edit" | "preview";
  toggleViewMode: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  theme,
  activeFile,
  activeUsers,
  viewMode,
  toggleViewMode,
}) => {
  return (
    <div
      className={`h-6 flex items-center justify-between px-4 text-xs ${
        theme === "dark"
          ? "bg-gray-800 border-t border-gray-700"
          : "bg-gray-100 border-t border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-4">
        <span>{activeFile}</span>
        <span>마크다운</span>
        <span>UTF-8</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span>협업자:</span>
          {activeUsers.map((user) => (
            <div key={user.id} className="flex items-center" title={user.name}>
              <span
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: user.color }}
              ></span>
              <span>{user.name}</span>
            </div>
          ))}
        </div>
        <button
          onClick={toggleViewMode}
          className="flex items-center space-x-1 cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i
            className={`fas ${viewMode === "edit" ? "fa-eye" : "fa-edit"}`}
          ></i>
          <span>{viewMode === "edit" ? "미리보기" : "편집"}</span>
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
