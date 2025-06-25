import { ipcMain } from 'electron';
import { windowService } from '../services/windowService';
import { SwitchWindowParams } from '../types';


export function registerWindowHandlers() {
  // 창 전환 이벤트
  ipcMain.on('switch-window', (_event, params: SwitchWindowParams) => {
    windowService.switchToWindow(params);
  });
}
