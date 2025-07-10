import { ipcMain, dialog, shell } from 'electron';
import { fileSystemService } from '../services/fileSystemService';
import fs from 'fs/promises';

export function registerFileSystemHandlers() {
  ipcMain.handle('open-folder-dialog', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });

    if (result.canceled || result.filePaths.length === 0) return null;
    
    return await fileSystemService.readFolderRecursive(result.filePaths[0]);
  });

  ipcMain.handle('read-file', async (_event, filePath: string) => {
    try {
      const content = await fileSystemService.readFile(filePath);
      
      return { success: true, content };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

  ipcMain.on('load-url', (_event, url: string) => {
    console.log(`Loading URL123213321123: ${url}`);
    shell.openExternal(url);
  });

  // 폴더 트리 새로고침
  ipcMain.handle('read-folder-tree', async (_event, folderPath: string) => {
    if (!folderPath) return null;
    return await fileSystemService.readFolderRecursive(folderPath);
  });
  
  // 파일 저장
  ipcMain.handle('save-file', async (_event, filePath: string, content: string) => {
    try {
      await fs.writeFile(filePath, content, 'utf-8');
      return { success: true };
    } catch (error: any) {
      console.error('File save failed:', error);
      return { success: false, error: error.message };
    }
  });

  // 파일 생성
  ipcMain.handle('create-file', async (_event, filePath: string) => {
    try {
      await fs.writeFile(filePath, ''); // 빈 파일 생성
      return { success: true, path: filePath };
    } catch (error: any) {
      console.error('File creation failed:', error);
      return { success: false, error: error.message };
    }
  });

  // 폴더 생성
  ipcMain.handle('create-folder', async (_event, folderPath: string) => {
    try {
      await fs.mkdir(folderPath, { recursive: true });
      return { success: true, path: folderPath };
    } catch (error: any) {
      console.error('Folder creation failed:', error);
      return { success: false, error: error.message };
    }
  });

}


