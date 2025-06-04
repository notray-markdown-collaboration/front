'use client'
import { useState } from 'react';

type FileNode = {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
};

export default function FolderViewer() {
  const [tree, setTree] = useState<FileNode | null>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<{ path: string; content: string } | null>(null);

  const handleOpenFolder = async () => {
    const result = await window.ipc.invoke('open-folder-recursive');
    if (result) setTree(result);
    setSelectedFile(null);
  };

  const toggleFolder = (path: string) => {
    setOpenFolders(prev => {
      const newSet = new Set(prev);
      newSet.has(path) ? newSet.delete(path) : newSet.add(path);
      return newSet;
    });
  };

  const handleFileClick = async (filePath: string) => {
    const result = await window.ipc.invoke('read-file', filePath);
    if (result.success) {
      setSelectedFile({ path: filePath, content: result.content });
    } else {
      alert(`파일을 읽는 중 오류 발생: ${result.error}`);
    }
  };

  const renderTree = (node: FileNode, depth = 0) => {
  const isOpen = openFolders.has(node.path);
  const isTextFile = node.name.endsWith('.md') || node.name.endsWith('.txt');

  return (
    <div key={node.path} style={{ marginLeft: depth * 16 }}>
      {node.isDirectory ? (
        <div onClick={() => toggleFolder(node.path)} style={{ cursor: 'pointer' }}>
          {isOpen ? '📂' : '📁'} {node.name}
        </div>
      ) : (
        <div
          onClick={isTextFile ? () => handleFileClick(node.path) : undefined}
          style={{
            cursor: isTextFile ? 'pointer' : 'default',
            color: isTextFile ? 'blue' : 'gray',
          }}
          title={isTextFile ? '' : 'md 또는 txt 파일만 열 수 있습니다.'}
        >
          📄 {node.name}
        </div>
      )}
      {isOpen && node.children?.map(child => renderTree(child, depth + 1))}
    </div>
  );
};


  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '40%', padding: 10 }}>
        <button onClick={handleOpenFolder}>📂 폴더 열기</button>
        <div style={{ marginTop: 20 }}>{tree ? renderTree(tree) : '폴더를 선택하세요.'}</div>
      </div>
      <div style={{ width: '60%', padding: 10, borderLeft: '1px solid #ccc' }}>
        {selectedFile ? (
          <>
            <h3>{selectedFile.path}</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{selectedFile.content}</pre>
          </>
        ) : (
          <p>파일을 선택하면 내용을 볼 수 있습니다.</p>
        )}
      </div>
    </div>
  );
}
