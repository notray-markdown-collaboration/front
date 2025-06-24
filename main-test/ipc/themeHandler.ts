import { ipcMain } from 'electron';
import { themeService } from '../services/themeService';

export function registerThemeHandlers() {
  ipcMain.handle('dark-mode:toggle', () => themeService.toggleTheme());
  ipcMain.handle('dark-mode:current', () => themeService.getCurrentTheme());
}
