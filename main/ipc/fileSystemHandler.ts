import { ipcMain, dialog, shell } from 'electron';
import { fileSystemService } from '../services/fileSystemService';


export function registerFileSystemHandlers() {
  ipcMain.handle('open-folder-dialog', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });

    if (result.canceled || result.filePaths.length === 0) return null;
    
    return fileSystemService.readFolderRecursive(result.filePaths[0]);
  });

  ipcMain.handle('read-file', (_event, filePath: string) => {
    try {
      const content = fileSystemService.readFile(filePath);
      
      return { success: true, content };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

  ipcMain.on('load-url', (_event, url: string) => {
    shell.openExternal(url);
  });
}
