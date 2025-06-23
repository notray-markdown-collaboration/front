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

// turndown 서비스 인스턴스 생성
const turndownService = new TurndownService();

export default function MarkdownEditor() {
  const [markdownContent, setMarkdownContent] = useState<string>();

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


  if (!editor) {
    return null;
  }

  return (
    <div style={{height: '100%'}} className={styles.tiptapEditorWrapper}> {/* page.module.css의 클래스 사용 */}
      <div style={{position: 'sticky', top: 0,}}>
        <EditorToolbar editor={editor}/>
      </div>  
      <div className={styles.editorContainer}>
        <EditorContent editor={editor} />
      </div>
      {/* <div className={styles.characterCount}> // 얼마나 썼는지 알려주는 건데 필요없을려나
        {editor.storage.characterCount.characters()} characters, {editor.storage.characterCount.words()} words
      </div> */}
    </div>
);
}
