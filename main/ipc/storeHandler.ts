import { ipcMain } from 'electron';
import { storeService } from '../services/storeService';

export function registerStoreHandlers() {
  ipcMain.handle('getStore', (_event, key: string) => storeService.get(key));
  ipcMain.handle('setStore', (_event, { key, value }: { key: string; value: unknown }) => storeService.set(key, value));
  ipcMain.handle('deleteStore', (_event, key: string) => storeService.delete(key));
}
