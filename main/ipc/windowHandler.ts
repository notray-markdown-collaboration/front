import { ipcMain, BrowserWindow } from 'electron';
import electronLocalshortcut from 'electron-localshortcut';
import { windowService } from '../services/windowService';
import { SwitchWindowParams } from '../types';


export function registerWindowHandlers() {
  // 창 전환 이벤트
  ipcMain.on('switch-window', (_event, params: SwitchWindowParams) => {
    windowService.switchToWindow(params);
  });

  // 개발자 도구 토글 (F12)
  // electron-localshortcut은 BrowserWindow 인스턴스가 필요하므로,
  // 핸들러 등록 시점이 아닌 창이 생성된 후 호출하는 것이 더 안정적입니다.
  // 이 함수는 background.ts에서 창 생성 후 호출합니다.
  ipcMain.on('register-dev-tools-toggle', (_event, win: BrowserWindow) => {
     if (win) {
       electronLocalshortcut.register(win, 'F12', () => {
         win.webContents.toggleDevTools();
       });
     }
  });
}
