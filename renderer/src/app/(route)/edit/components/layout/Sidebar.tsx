// components/Sidebar.tsx
import React from "react";

interface SidebarProps {
  theme: "light" | "dark";
  fileStructure: Record<
    string,
    { type: "file" | "folder"; parent: string | null }
  >;
  activeFile: string;
  openFile: (path: string) => void;
  openFiles: string[];
  setOpenFiles: (paths: string[]) => void;
  expandedFolders: string[];
  setExpandedFolders: (folders: string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  theme,
  fileStructure,
  activeFile,
  openFile,
  expandedFolders,
  setExpandedFolders,
}) => {
  const toggleFolder = (folder: string) => {
    if (expandedFolders.includes(folder)) {
      setExpandedFolders(expandedFolders.filter((f) => f !== folder));
    } else {
      setExpandedFolders([...expandedFolders, folder]);
    }
  };

  const renderTree = (parent: string | null, level: number = 0) => {
    return Object.entries(fileStructure)
      .filter(([_, info]) => info.parent === parent)
      .map(([path, info]) => {
        if (info.type === "file") {
          return (
            <div
              key={path}
              onClick={() => openFile(path)}
              className={`flex items-center p-1.5 rounded cursor-pointer ml-${
                level * 4
              } ${
                activeFile === path
                  ? theme === "dark"
                    ? "bg-gray-700"
                    : "bg-blue-100"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <i className="fas fa-file-alt mr-2 text-blue-500"></i>
              <span className="truncate">{path.split("/").pop()}</span>
            </div>
          );
        } else {
          const isExpanded = expandedFolders.includes(path);
          return (
            <div key={path} className={`ml-${level * 4}`}>
              <div
                onClick={() => toggleFolder(path)}
                className="flex items-center p-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <i
                  className={`fas ${
                    isExpanded ? "fa-chevron-down" : "fa-chevron-right"
                  } text-xs mr-1.5 w-3`}
                ></i>
                <i className="fas fa-folder mr-2 text-yellow-500"></i>
                <span className="truncate">{path.split("/").pop()}</span>
              </div>
              {isExpanded && renderTree(path, level + 1)}
            </div>
          );
        }
      });
  };

  return (
    <aside
      className={`w-64 flex flex-col border-r ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div
        className={`p-3 flex justify-between items-center border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2 className="font-semibold">작업 파일</h2>
        <div className="flex space-x-1">
          <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-plus text-xs"></i>
          </button>
          <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-folder-plus text-xs"></i>
          </button>
          <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-ellipsis-h text-xs"></i>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 h-[calc(100vh-6rem)]">
        {renderTree(null)}
      </div>
    </aside>
  );
};

export default Sidebar;
