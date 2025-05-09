// components/Header.tsx
import React from "react";

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
      className={`h-12 flex items-center justify-between px-4 ${
        theme === "dark"
          ? "bg-gray-800 border-b border-gray-700"
          : "bg-gray-100 border-b border-gray-200"
      }`}
    >
      <div className="flex items-center">
        <i className="fas fa-edit mr-2"></i>
        <h1 className="text-lg font-semibold">협업 텍스트 에디터</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {activeUsers.map((user, index) => (
            <div
              key={user.id}
              className="relative -ml-2 first:ml-0"
              style={{ zIndex: 10 - index }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 cursor-pointer"
                title={user.name}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-800"></span>
            </div>
          ))}
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
          aria-label="테마 전환"
        >
          {theme === "light" ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </button>
        <div className="relative">
          <button className="flex items-center space-x-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
            <img
              src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20woman%20with%20long%20black%20hair%2C%20clean%20appearance%2C%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=30&height=30&seq=currentuser&orientation=squarish"
              alt="현재 사용자"
              className="w-6 h-6 rounded-full"
            />
            <span>박소연</span>
            <i className="fas fa-chevron-down text-xs"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
