// src/app/(route)/editTest/page.tsx
'use client'; // 이 줄이 반드시 맨 첫 줄에 있어야 합니다.

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

// CSS 모듈 임포트 (이 파일은 src/app/(route)/editTest/page.module.css 에 있어야 합니다)
import styles from './page.module.css';

// turndown 서비스 인스턴스 생성
const turndownService = new TurndownService();

export default function EditTestPage() {
  // 에디터의 마크다운 콘텐츠를 관리할 상태
  const [markdownContent, setMarkdownContent] = useState<string>(
    '# Next.js 14 Tiptap!\n\n이것은 **단일 페이지**에 구현된 Tiptap WYSIWYG 마크다운 편집기입니다.\n\n- 항목 1\n- 항목 2\n\n```javascript\nconsole.log("안녕, 세상!");\n```\n\n[구글](https://google.com)\n\n![Tiptap 로고](https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg)\n'
  );

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
    // 초기 콘텐츠는 마크다운을 HTML로 변환하여 Tiptap에 전달
    content: marked.parse(markdownContent || ''), // 초기 상태의 markdownContent 사용
    onUpdate: ({ editor }) => {
      // 에디터 내용이 변경될 때마다 HTML을 마크다운으로 변환하여 상태 업데이트
      const htmlContent = editor.getHTML();
      const newMarkdownContent = turndownService.turndown(htmlContent);
      setMarkdownContent(newMarkdownContent); // 직접 상태 업데이트
    },
    editorProps: {
      attributes: {
        // CSS 모듈 클래스 적용
        class: styles.tiptapEditorContent,
      },
    },
  });

  // 외부에서 content prop이 변경될 경우, 에디터 내용을 업데이트
  // 이 부분은 이제 필요 없어졌습니다. (markdownContent가 동일 페이지 내에서 관리되므로)
  // 하지만 초기 로딩 시 content가 빈 문자열일 경우 등을 위해 유지할 수는 있습니다.
  // 이 페이지에서는 markdownContent가 useEditor의 초기값으로 사용되므로,
  // 일반적으로는 이 useEffect가 필요 없습니다.
  // const initialContent = marked.parse(markdownContent || '');
  // useEffect(() => {
  //   if (editor && editor.getHTML() !== initialContent) { // 변경 여부 확인
  //     editor.commands.setContent(initialContent, false);
  //   }
  // }, [initialContent, editor]);


  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <main style={{overflow: 'auto', height: '100%'}}>
      <div style={{overflow: 'auto'}} className={styles.tiptapEditorWrapper}> {/* page.module.css의 클래스 사용 */}
        <div style={{overflow: 'auto'}} className={styles.tiptapToolbar}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`${styles.toolbarButton} ${editor.isActive('bold') ? styles.active : ''}`}
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`${styles.toolbarButton} ${editor.isActive('italic') ? styles.active : ''}`}
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`${styles.toolbarButton} ${editor.isActive('strike') ? styles.active : ''}`}
          >
            <s>S</s>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`${styles.toolbarButton} ${editor.isActive('code') ? styles.active : ''}`}
          >
            `C`
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`${styles.toolbarButton} ${editor.isActive('paragraph') ? styles.active : ''}`}
          >
            P
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 1 }) ? styles.active : ''}`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${styles.toolbarButton} ${editor.isActive('bulletList') ? styles.active : ''}`}
          >
            UL
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${styles.toolbarButton} ${editor.isActive('orderedList') ? styles.active : ''}`}
          >
            OL
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${styles.toolbarButton} ${editor.isActive('codeBlock') ? styles.active : ''}`}
          >
            Code Block
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${styles.toolbarButton} ${editor.isActive('blockquote') ? styles.active : ''}`}
          >
            Quote
          </button>
          <button
            onClick={setLink}
            className={`${styles.toolbarButton} ${editor.isActive('link') ? styles.active : ''}`}
          >
            Link
          </button>
          <button
            onClick={addImage}
            className={styles.toolbarButton}
          >
            Image
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={styles.toolbarButton}
          >
            HR
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={styles.toolbarButton}
          >
            Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={styles.toolbarButton}
          >
            Redo
          </button>
          <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className={styles.toolbarButton}
          >
            Table
          </button>
          {editor.isActive('table') && (
            <>
              <button
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className={styles.toolbarButton}
              >
                Add Row After
              </button>
              <button
                onClick={() => editor.chain().focus().deleteRow().run()}
                className={styles.toolbarButton}
              >
                Delete Row
              </button>
              <button
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className={styles.toolbarButton}
              >
                Add Col After
              </button>
              <button
                onClick={() => editor.chain().focus().deleteColumn().run()}
                className={styles.toolbarButton}
              >
                Delete Col
              </button>
              <button
                onClick={() => editor.chain().focus().deleteTable().run()}
                className={styles.toolbarButton}
              >
                Delete Table
              </button>
            </>
          )}
        </div>
        <EditorContent editor={editor} />
        <div className={styles.characterCount}>
          {editor.storage.characterCount.characters()} characters, {editor.storage.characterCount.words()} words
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.5em', fontWeight: 'semibold', marginBottom: '10px' }}>생성된 마크다운:</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9em', lineHeight: '1.5', backgroundColor: '#eee', padding: '10px', borderRadius: '4px' }}>
          {markdownContent}
        </pre>
      </div>
    </main>
  );
}