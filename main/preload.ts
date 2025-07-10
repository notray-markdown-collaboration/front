import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import type { FileNode, SwitchWindowParams } from './types';

export const api = {
  // Store API
  getStore: <T>(key: string): Promise<T> => ipcRenderer.invoke('getStore', key),
  setStore: (key: string, value: unknown): Promise<void> => ipcRenderer.invoke('setStore', { key, value }),
  deleteStore: (key: string): Promise<void> => ipcRenderer.invoke('deleteStore', key),

  // FileSystem API
  openFolderDialog: (): Promise<FileNode | null> => ipcRenderer.invoke('open-folder-dialog'),
  readFile: (filePath: string): Promise<{ success: boolean; content?: string; error?: string }> => ipcRenderer.invoke('read-file', filePath),
  loadUrl: (url: string): void => ipcRenderer.send('load-url', url),
  readFolderTree: (path: string): Promise<FileNode | null> => ipcRenderer.invoke('read-folder-tree', path),
  saveFile: (filePath: string, content: string): Promise<{ success: boolean; error?: string }> => ipcRenderer.invoke('save-file', filePath, content),
  createFile: (filePath: string): Promise<{ success: boolean; path?: string; error?: string }> => ipcRenderer.invoke('create-file', filePath),
  createFolder: (folderPath: string): Promise<{ success: boolean; path?: string; error?: string }> => ipcRenderer.invoke('create-folder', folderPath),

  // Theme API
  toggleTheme: (): Promise<'light' | 'dark'> => ipcRenderer.invoke('dark-mode:toggle'),
  getCurrentTheme: (): Promise<'light' | 'dark'> => ipcRenderer.invoke('dark-mode:current'),

  // Window API
  switchWindow: (params: SwitchWindowParams): void => ipcRenderer.send('switch-window', params),

  // Listener API (Main -> Renderer)
  onThemeUpdated: (callback: (theme: 'light' | 'dark') => void) => {
    const subscription = (_event: IpcRendererEvent, theme: 'light' | 'dark') => callback(theme);
    ipcRenderer.on('theme-updated', subscription);
    return () => ipcRenderer.removeListener('theme-updated', subscription);
  },
};

contextBridge.exposeInMainWorld('electronAPI', api);

export type IpcHandler = typeof api;