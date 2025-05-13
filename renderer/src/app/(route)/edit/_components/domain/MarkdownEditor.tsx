// components/MarkdownEditor.tsx
import React from "react";

interface User {
  id: number;
  name: string;
  color: string;
  avatar: string;
}

interface MarkdownEditorProps {
  theme: "light" | "dark";
  viewMode: "edit" | "preview";
  markdownContent: string;
  activeUsers: User[];
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  theme,
  viewMode,
  markdownContent,
  activeUsers,
}) => {
  if (viewMode !== "edit") return null;

  return (
    <div className="flex-1 relative h-[calc(100vh-8.5rem)] overflow-y-auto">
      {activeUsers.slice(0, 2).map((user, idx) => (
        <div
          key={user.id}
          className={`absolute top-${idx === 0 ? 20 : 32} left-${
            idx === 0 ? 24 : 40
          } group`}
        >
          <div className="flex items-center">
            <div className="relative">
              <div
                className="w-[3px] h-[18px] rounded-full animate-pulse"
                style={{ backgroundColor: user.color }}
              ></div>
              <div
                className="absolute left-0 bottom-0 w-[3px] h-[3px] rounded-full animate-ping"
                style={{ backgroundColor: user.color }}
              ></div>
            </div>
            <div className="ml-1.5 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-4 h-4 rounded-full mr-1"
              />
              <span
                className="px-1.5 py-0.5 text-xs text-white rounded-full shadow-sm"
                style={{ backgroundColor: user.color }}
              >
                {user.name}
              </span>
            </div>
          </div>
        </div>
      ))}
      <pre
        className={`p-4 font-mono text-sm whitespace-pre-wrap ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        {markdownContent}
      </pre>
    </div>
  );
};

export default MarkdownEditor;
