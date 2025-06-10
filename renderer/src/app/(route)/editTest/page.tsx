"use client";

import { useEffect, useRef, useState } from "react";
import { useReadingFileStore } from "app/_store/readingFileStore"; 
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./page.module.css";
import remarkGfm from "remark-gfm";

type Line = {
  id: number;
  text: string;
  isEditing: boolean;
};

const MIN_LINES = 30;

export default function MarkdownEditor() {
  const { selectedFile } = useReadingFileStore();
  const [lines, setLines] = useState<Line[]>([]);
  const inputRefs = useRef<Array<HTMLTextAreaElement | null>>([]);
  const ctrlACountRef = useRef(0);
  const lastCtrlATime = useRef(0);
  const [txtValue, setTxtValue] = useState("");

  useEffect(() => {
    if (!selectedFile) return;

    if (selectedFile.path.endsWith(".md")) {
      const mdLines = selectedFile.content.split("\n").map((line, i) => ({
        id: i + 1,
        text: line,
        isEditing: false,
      }));
      setLines(mdLines.length > 0 ? mdLines : Array.from({ length: MIN_LINES }, (_, i) => ({
        id: i + 1,
        text: "",
        isEditing: true,
      })));
    } else if (selectedFile.path.endsWith(".txt")) {
      setTxtValue(selectedFile.content);
    }
  }, [selectedFile]);

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
      e.preventDefault();
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
      const currentLine = lines[index].text;
      const match = currentLine.match(/^([ \t]*)([-*+] |\d+\. |[a-z]\. )/);
      const prefix = match ? match[0] : "";

      setLines((prev) => {
        const updated = [...prev];
        updated[index].isEditing = false;
        const newLine = {
          id: updated.length + 1,
          text: prefix,
          isEditing: true,
        };
        updated.splice(index + 1, 0, newLine);
        return updated;
      });

      setTimeout(() => {
        const textarea = inputRefs.current[index + 1];
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(prefix.length, prefix.length);
        }
      }, 0);
      return;
    }

    // Tab → 공백 삽입
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const value = textarea.value;
      const indentMatch = value.match(/^([ \t]*)/);
      const currentIndent = indentMatch ? indentMatch[1] : "";
      const base = value.trimStart();

      if (e.shiftKey) {
        // Shift+Tab: outdent by 2 spaces
        const newIndent = currentIndent.replace(/^ {1,4}/, "");
        const newValue = newIndent + base;
        handleChange(index, newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = Math.max(start - 2, 0);
        }, 0);
      } else {
        // Tab: indent by 2 spaces with no upper limit
        const newIndent = currentIndent + "  ";
        const orderedMatch = base.match(/^(\d+)\. /);
        let newValue = newIndent + base;
        if (orderedMatch) {
          newValue = newIndent + base.replace(/^(\d+)\. /, "a. ");
        }
        handleChange(index, newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
      return;
    }
  };


const sanitizeCodeBlock = (content: string) => {
  // 리스트 문법인데 마크다운이 코드로 오해한 경우 → 일반 텍스트로 렌더링
  if (/^\s{4,}(- |\* |\d+\.|[a-z]\. )/.test(content)) {
    return { asPlainText: true, content: content.trimStart() };
  }
  return { asPlainText: false, content };
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
      prev.map((line, i) =>
        i === index ? { ...line, isEditing: true } : line
      )
    );
    setTimeout(() => {
      inputRefs.current[index]?.focus();
    }, 0);
  };

  if (!selectedFile) return <div>파일을 선택하세요.</div>;

  return (
    <div className={styles.wrapper}>
      {selectedFile.path.endsWith(".txt") ? (
        <textarea
          value={txtValue}
          onChange={(e) => setTxtValue(e.target.value)}
          className={styles.textarea}
          style={{ minHeight: "500px", width: "100%" }}
        />
      ) : (
        lines.map((line, idx) =>
          line.isEditing ? (
            <textarea
              key={line.id}
              ref={(el) => {
              inputRefs.current[idx] = el;
              if (el) {
                el.style.height = "auto";
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
              onBlur={() =>
                setLines((prev) => {
                  const updated = [...prev];
                  updated[idx].isEditing = false;
                  return updated;
                })
              }
              rows={1}
            />
          ) : (
            <div
              key={line.id}
              className={styles.markdownLine}
              onClick={() => handleLineClick(idx)}
            >
              <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ node, inline, className, children, ...props }: any) {
      const raw = String(children).replace(/\n$/, "");
      const { asPlainText, content } = sanitizeCodeBlock(raw);

      if (asPlainText) {
        return <>{content}</>; // 일반 텍스트로 렌더링
      }

      const match = /language-(\w+)/.exec(className || "");
      const lang = match?.[1] || "text";
      const supportedLanguages = [
        "js", "ts", "tsx", "jsx", "html", "css", "json", "bash",
        "python", "java", "c", "cpp",
      ];
      const validLang = supportedLanguages.includes(lang) ? lang : "text";

      return !inline ? (
        <SyntaxHighlighter
          style={oneDark}
          language={validLang}
          PreTag="div"
          showLineNumbers
          wrapLines
          customStyle={{
            background: "#0e1117",
            fontSize: "0.9rem",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #333",
          }}
          {...props}
        >
          {content}
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
        )
      )}
    </div>
  );
}
