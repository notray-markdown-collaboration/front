import { useCallback } from "react";
import { Editor } from '@tiptap/react'
import styles from './EditorToolbar.module.css'
interface props{
  editor: Editor | null;
}
export default function EditorToolbar({ editor }:props) {
  
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

  if(!editor) return;

  return(
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
  )
}