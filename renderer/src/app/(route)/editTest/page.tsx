"use client";
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Line = {
  id: number;
  text: string;
  isEditing: boolean;
};

const MIN_LINES = 30;

export default function MarkdownEditor() {
  const initialLines: Line[] = Array.from({ length: MIN_LINES }, (_, i) => ({
    id: i + 1,
    text: "",
    isEditing: true,
  }));
  const ctrlACountRef = useRef(0);
  const lastCtrlATime = useRef(0);
  const [lines, setLines] = useState<Line[]>(initialLines);
  const inputRefs = useRef<Array<HTMLTextAreaElement | null>>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const isAtStart = e.currentTarget.selectionStart === 0;
    const isSelecting =
      e.currentTarget.selectionStart !== e.currentTarget.selectionEnd;

    // ✅ Ctrl+A 누른 횟수 확인
    if (e.ctrlKey && e.key.toLowerCase() === "a") {
      const now = Date.now();

      // 첫 번째 Ctrl+A → 기본 동작 허용 (전체 선택)
      if (now - lastCtrlATime.current < 500) {
        // 두 번째 빠른 Ctrl+A
        const fullText = lines.map((line) => line.text).join("\n");
        navigator.clipboard.writeText(fullText);
        setTimeout(() => {
          inputRefs.current[index]?.focus();
        }, 0);

        // ✅ 알림 대신 콘솔 또는 toast로 처리
        console.log("✅ 전체 내용이 클립보드에 복사되었습니다.");
        lastCtrlATime.current = 0;
      } else {
        lastCtrlATime.current = now;
        // ✅ 기본 동작 허용!
        return;
      }

      e.preventDefault(); // 두 번째만 막는다
      return;
    }

    // ✅ Backspace → 위로 이동
    if (e.key === "Backspace" && isAtStart && !isSelecting && index > 0) {
      e.preventDefault();
      setLines((prev) => {
        const updated = [...prev];
        updated[index].isEditing = false;
        updated[index - 1].isEditing = true;
        return updated;
      });

      setTimeout(() => {
        const prev = inputRefs.current[index - 1];
        if (prev) {
          prev.focus();
          prev.setSelectionRange(prev.value.length, prev.value.length);
        }
      }, 0);

      return;
    }

    // ✅ Enter → 다음 줄
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setLines((prev) => {
        const updated = [...prev];
        updated[index].isEditing = false;
        if (index + 1 >= updated.length) {
          updated.push({ id: updated.length + 1, text: "", isEditing: true });
        } else {
          updated[index + 1].isEditing = true;
        }
        return updated;
      });

      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }

    // Tab → 공백 삽입
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      const newValue = value.substring(0, start) + "  " + value.substring(end);
      handleChange(index, newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
      return;
    }
  };

  const handleChange = (index: number, value: string) => {
    setLines((prev) => {
      const updated = [...prev];
      updated[index].text = value;
      return updated;
    });
  };

  const handleLineClick = (index: number) => {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, isEditing: true } : line))
    );

    setTimeout(() => {
      inputRefs.current[index]?.focus();
    }, 0);
  };

  return (
    <div className={styles.wrapper}>
      {lines.map((line, idx) =>
        line.isEditing ? (
          <textarea
            key={line.id}
            ref={(el) => {
              inputRefs.current[idx] = el;
              if (el) {
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }
            }}
            className={styles.textarea}
            value={line.text}
            onChange={(e) => {
              handleChange(idx, e.target.value);
              const target = e.target;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onBlur={() => {
              setLines((prev) => {
                console.log(prev);
                const updated = [...prev];
                updated[idx].isEditing = false;
                return updated;
              });
            }}
            rows={1}
          />
        ) : (
          <div
            key={line.id}
            className={styles.markdownLine}
            onClick={() => handleLineClick(idx)}
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const lang = match?.[1] || "";
                  const supportedLanguages = [
                    "js",
                    "javascript",
                    "ts",
                    "typescript",
                    "json",
                    "html",
                    "css",
                    "bash",
                    "python",
                    "java",
                    "c",
                    "cpp",
                    "tsx",
                    "jsx",
                  ];
                  const validLang = supportedLanguages.includes(lang)
                    ? lang
                    : "text";

                  return !inline ? (
                    <SyntaxHighlighter
                      style={oneDark as any}
                      language={validLang}
                      PreTag="div"
                      showLineNumbers
                      wrapLines
                      lineProps={{ style: { whiteSpace: "pre-wrap" } }}
                      customStyle={{
                        background: "#0e1117",
                        fontSize: "0.9rem",
                        padding: "1rem",
                        borderRadius: "8px",
                        border: "1px solid #333",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {line.text}
            </ReactMarkdown>
          </div>
        )
      )}
    </div>
  );
}
