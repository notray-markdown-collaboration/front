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

const MIN_LINES = 10;

export default function MarkdownEditor() {
  const initialLines: Line[] = Array.from({ length: MIN_LINES }, (_, i) => ({
    id: i + 1,
    text: "",
    isEditing: true,
  }));

  const [lines, setLines] = useState<Line[]>(initialLines);
  const inputRefs = useRef<Array<HTMLTextAreaElement | null>>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const isAtStart = e.currentTarget.selectionStart === 0;

    // ✅ Shift + Enter → 줄 안에서 줄바꿈 (기본 동작 유지)
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }

    // 맨 앞에서 백스페이스 → 위 줄로 포커스 이동
    if (e.key === "Backspace" && isAtStart && index > 0) {
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
          prev.setSelectionRange(prev.value.length, prev.value.length); // 커서 끝으로
        }
      }, 0);

      return;
    }

    // Enter → 다음 줄로 이동
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

              // ✅ 입력 중에도 높이 동기화
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
            onKeyDown={(e) => handleKeyDown(e, idx)}
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
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark as any}
                      language={match[1]}
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
