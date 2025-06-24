import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import type { FileNode, SwitchWindowParams } from './types';

// 렌더러에서 사용할 API 목록을 명시적으로 정의합니다.
// 이것이 바로 렌더러와 메인 프로세스 간의 "API 계약서"입니다.
export const api = {
  // Store API
  getStore: <T>(key: string): Promise<T> => ipcRenderer.invoke('getStore', key),
  setStore: (key: string, value: unknown): Promise<void> => ipcRenderer.invoke('setStore', { key, value }),
  deleteStore: (key: string): Promise<void> => ipcRenderer.invoke('deleteStore', key),

  // FileSystem API
  openFolderDialog: (): Promise<FileNode | null> => ipcRenderer.invoke('open-folder-dialog'),
  readFile: (filePath: string): Promise<{ success: boolean; content?: string; error?: string }> => ipcRenderer.invoke('read-file', filePath),
  loadUrl: (url: string): void => ipcRenderer.send('load-url', url),

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
  onOauthToken: (callback: (tokens: {accessToken?: string, refreshToken?: string}) => void) => {
    const subscription = (_event: IpcRendererEvent, tokens: {accessToken?: string, refreshToken?: string}) => callback(tokens);
    ipcRenderer.on('oauth-token', subscription);
    return () => ipcRenderer.removeListener('oauth-token', subscription);
  },
};

// contextBridge를 통해 안전하게 API를 노출합니다.
contextBridge.exposeInMainWorld('electronAPI', api);
