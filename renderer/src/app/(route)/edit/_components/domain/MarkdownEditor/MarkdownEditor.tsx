'use client';
import { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// 마크다운 파서 라이브러리 임포트
import { marked } from 'marked';
import TurndownService from 'turndown';

// 필요한 Tiptap 확장들을 불러옵니다.
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlock from '@tiptap/extension-code-block';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import styles from './MarkdownEditor.module.css';
import EditorToolbar from '../EditorToolbar/EditorToolbar';
import { useReadingFileStore } from '@/app/_store/readingFileStore';

// turndown 서비스 인스턴스 생성
const turndownService = new TurndownService();

export default function MarkdownEditor() {
  const { selectedFile } = useReadingFileStore();
  const [markdownContent, setMarkdownContent] = useState<string | undefined>(undefined);

  // 선택된 파일의 경로를 기반으로 마크다운 파일인지 판별합니다.
  const isMarkdownFile = selectedFile?.path?.endsWith('.md') || false;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
      CharacterCount.configure({
        limit: 10000,
      }),
      CodeBlock,
      HardBreak,
      HorizontalRule,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
    ],
    // Tiptap 에디터의 초기 content는 빈 문자열로 설정하고,
    // 실제 내용은 useEffect에서 selectedFile에 따라 설정합니다.
    content: '',
    onUpdate: ({ editor }) => {
      // 에디터 내용이 변경될 때마다 HTML을 마크다운으로 변환하여 상태 업데이트
      // 이 로직은 마크다운 파일일 때만 유효합니다.
      if (isMarkdownFile) {
        const htmlContent = editor.getHTML();
        const newMarkdownContent = turndownService.turndown(htmlContent);
        setMarkdownContent(newMarkdownContent);
      }
      // 마크다운 파일이 아니어도 textarea의 변경 사항을 markdownContent에 반영
      else {
        // textarea의 경우 onUpdate는 호출되지 않으므로, 이 블록은 Tiptap 에디터에만 해당합니다.
        // textarea의 내용은 onChange 핸들러에서 직접 markdownContent를 업데이트합니다.
      }
    },
    editorProps: {
      attributes: {
        class: styles.tiptapEditorContent,
      },
    },
  });

  // selectedFile 또는 editor 객체가 변경될 때 에디터 내용을 업데이트합니다.
  useEffect(() => {
    if (editor && selectedFile) {
      if (isMarkdownFile) {
        const htmlContent = marked.parse(selectedFile.content || '');
        editor.commands.setContent(htmlContent);
      } else {
        // 마크다운 파일이 아니면 Tiptap 에디터의 내용을 비웁니다.
        // 이렇게 하지 않으면 Tiptap 에디터가 화면에서 사라질 때 마지막 내용이 남아있을 수 있습니다.
        editor.commands.setContent('');
      }
      // markdownContent 상태는 파일 유형에 관계없이 업데이트합니다 (textarea에서도 사용하기 위함).
      setMarkdownContent(selectedFile.content);
    } else if (editor) {
      // 선택된 파일이 없을 때 에디터 내용을 초기화합니다.
      editor.commands.setContent('');
      setMarkdownContent('');
    }
  }, [selectedFile, editor, isMarkdownFile]); // 의존성 배열에 isMarkdownFile 추가

  // 마크다운 파일인데 에디터가 아직 준비되지 않았다면 null을 반환합니다.
  // 마크다운 파일이 아니면 에디터 객체가 필요 없으므로 이 조건에 해당하지 않습니다.
  if (isMarkdownFile && !editor) {
    return null;
  }

  return (
    <div style={{ height: '100%' }} className={styles.tiptapEditorWrapper}>
      {/* EditorToolbar는 항상 표시되지만, isEditable prop을 통해 활성화/비활성화를 제어합니다. */}
      <div style={{ position: 'sticky', top: 0 }}>
        {/* EditorToolbar 컴포넌트 내부에서 isEditable prop을 사용하여 버튼들을 비활성화해야 합니다. */}
        <EditorToolbar editor={editor} isEditable={isMarkdownFile} />
      </div>
      <div className={styles.editorContainer}>
        {isMarkdownFile ? (
          // 마크다운 파일일 경우 Tiptap 에디터 렌더링
          <EditorContent editor={editor} />
        ) : (
          // 마크다운 파일이 아닐 경우 textarea 렌더링
          <textarea
            className={styles.plainTextEditor} // textarea를 위한 CSS 클래스
            value={markdownContent || ''}
            onChange={(e) => setMarkdownContent(e.target.value)}
          />
        )}
      </div>
      {/* <div className={styles.characterCount}>
        {editor.storage.characterCount.characters()} characters, {editor.storage.characterCount.words()} words
      </div> */}
    </div>
  );
}
