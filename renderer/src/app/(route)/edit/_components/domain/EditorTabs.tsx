// components/EditorTabs.tsx
import React from "react";

interface EditorTabsProps {
  theme: "light" | "dark";
  activeFile: string;
  setActiveFile: (file: string) => void;
  openFiles: string[];
  setOpenFiles: (files: string[]) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  theme,
  activeFile,
  setActiveFile,
  openFiles,
  setOpenFiles,
}) => {
  const closeFile = (file: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter((f) => f !== file);
    setOpenFiles(newOpenFiles);
    if (activeFile === file && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[0]);
    }
  };

  return (
    <div
      className={`flex border-b ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      {openFiles.map((file) => (
        <div
          key={file}
          onClick={() => setActiveFile(file)}
          className={`flex items-center px-4 py-2 border-r cursor-pointer ${
            activeFile === file
              ? theme === "dark"
                ? "bg-gray-900 border-b-2 border-b-blue-500"
                : "bg-white border-b-2 border-b-blue-500"
              : theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700 border-b-gray-700"
              : "bg-gray-50 hover:bg-gray-100 border-b-gray-200"
          }`}
        >
          <i
            className={`fas ${
              file.endsWith(".tsx") ? "fa-file-code" : "fa-file-alt"
            } mr-2 ${
              file.endsWith(".tsx") ? "text-purple-500" : "text-blue-500"
            }`}
          ></i>
          <span className="truncate max-w-[120px]">
            {file.split("/").pop()}
          </span>
          <button
            onClick={(e) => closeFile(file, e)}
            className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 !rounded-button whitespace-nowrap"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;
