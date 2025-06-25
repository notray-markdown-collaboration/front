import { BrowserWindow } from 'electron';
import path from 'path';
import { createWindow } from '../helpers/createWindow';
import { SwitchWindowParams } from '../types';

const isProd = process.env.NODE_ENV === 'production';

/**
 * 앱의 창(Window) 생성 및 관리를 담당하는 서비스입니다.
 */
class WindowService {
  public mainWindow: BrowserWindow | null = null;

  public switchToWindow(params: SwitchWindowParams) {
    // 기존 창이 있으면 닫기
    if (this.mainWindow) {
      this.mainWindow.close();
      this.mainWindow = null;
    }

    // 새 창 생성
    this.mainWindow = createWindow('main', {
      width: params.width,
      height: params.height,
      frame: true, // 프레임은 항상 사용하도록 설정 (필요시 조절)
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    if (params.isFullScreen) {
      this.mainWindow.maximize();
    }
    
    this.mainWindow.resizable = !params.isFixed;
    
    if (params.uri === 'start') {
      this.mainWindow.center();
    }

    // URL 로드
    const port = process.env.PORT || 8888;
    const url = isProd ? `app://./${params.uri}.html` : `http://localhost:${port}/${params.uri}`;
    this.mainWindow.loadURL(url);

    if (!isProd) {
      this.mainWindow.webContents.openDevTools();
    }
  }
}

export const windowService = new WindowService();
