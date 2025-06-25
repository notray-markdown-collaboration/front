import { nativeTheme, BrowserWindow } from 'electron';
import { storeService } from './storeService';

/**
 * 앱의 다크 모드/라이트 모드 테마를 관리하는 서비스입니다.
 */
class ThemeService {
  constructor() {
    // 시스템 테마 변경 감지 시 연결된 모든 창에 이벤트 전송
    nativeTheme.on('updated', () => {
      const theme = this.getCurrentTheme();
      BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send('theme-updated', theme);
      });
    });
  }

  /**
   * 현재 테마를 반환합니다. 저장된 값이 없으면 시스템 설정을 따릅니다.
   */
  public getCurrentTheme(): 'light' | 'dark' {
    const storedTheme = storeService.get<'light' | 'dark'>('theme');
    return storedTheme ?? (nativeTheme.shouldUseDarkColors ? 'dark' : 'light');
  }
  
  /**
   * 테마를 토글하고 저장합니다.
   */
  public toggleTheme(): 'light' | 'dark' {
    const newTheme = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';
    nativeTheme.themeSource = newTheme;
    storeService.set('theme', newTheme);
    return newTheme;
  }
  
  /**
   * 특정 창에 현재 테마를 전송합니다. (주로 창이 새로 로드되었을 때 사용)
   */
  public sendCurrentTheme(win: BrowserWindow | null) {
      if (!win) return;
      win.webContents.on('did-finish-load', () => {
          win.webContents.send('theme-updated', this.getCurrentTheme());
      });
  }
}

export const themeService = new ThemeService();
