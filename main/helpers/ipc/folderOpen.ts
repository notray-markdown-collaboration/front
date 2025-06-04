import fs from 'fs';
import { app, dialog, ipcMain, shell } from "electron";
import path from 'path';
type FileNode = {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
};
export default function FolderOpen() {
  function readFolderRecursive(folderPath: string): FileNode {
    const entries = fs.readdirSync(folderPath);
    const result: FileNode = {
      name: path.basename(folderPath),
      path: folderPath,
      isDirectory: true,
      children: [],
    };

    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        result.children!.push(readFolderRecursive(fullPath));
      } else {
        result.children!.push({
          name: entry,
          path: fullPath,
          isDirectory: false,
        });
      }
    }

    return result;
  }

  ipcMain.handle('open-folder-recursive', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    const folderPath = result.filePaths[0];
    const tree = readFolderRecursive(folderPath);
    return tree;
  });

  ipcMain.handle('read-file', async (_event, filePath: string) => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return { success: true, content };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });
}
