import { app, BrowserWindow, Menu } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import { createWindow } from './helpers/createWindow';
import { initializeIpcHandlers } from './ipc';
import { storeService } from './services/storeService';
import { themeService } from './services/themeService';
import { deeplinkService } from './services/deeplinkService';
import { windowService } from './services/windowService';

const isProd: boolean = process.env.NODE_ENV === 'production';

// 1. 환경 설정
if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

// 2. 단일 인스턴스 보장 및 딥링크 처리
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (_event, argv) => {
    // 두 번째 인스턴스가 실행되려고 할 때, 이미 실행된 앱에서 처리
    if (windowService.mainWindow) {
      if (windowService.mainWindow.isMinimized()) windowService.mainWindow.restore();
      windowService.mainWindow.focus();
    }
    // 딥링크 처리
    const url = argv.find((arg) => arg.startsWith('notray://'));
    if (url) deeplinkService.handle(url);
  });
}

// 3. 앱 준비 완료 후 실행될 메인 로직
async function onReady() {
  // IPC 핸들러 등록
  initializeIpcHandlers();

  // 시작 페이지 결정
  const refreshToken = storeService.get<string>('refreshToken');
  const initialPage = refreshToken ? 'main' : 'start';

  // 메인 윈도우 생성
  const mainWindow = createWindow('main', {
    width: refreshToken ? 1280 : 700,
    height: refreshToken ? 720 : 470,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    frame: true,
  });
  
  // 생성된 창을 windowService에 등록
  windowService.mainWindow = mainWindow;

  // 창 속성 설정
  if (!refreshToken) {
    mainWindow.resizable = false;
    mainWindow.center();
  } else {
    mainWindow.maximize();
  }

  // 메뉴바 제거
  Menu.setApplicationMenu(null);

  // 페이지 로드
  const port = process.env.PORT || 8888;
  const url = isProd ? `app://./${initialPage}.html` : `http://localhost:${port}/${initialPage}`;
  await mainWindow.loadURL(url);

  // 개발 환경에서만 DevTools 열기
  if (!isProd) {
    mainWindow.webContents.openDevTools();
  }

  // 창에 종속적인 서비스 및 핸들러 초기화
  themeService.sendCurrentTheme(mainWindow);
  mainWindow.webContents.send('register-dev-tools-toggle', mainWindow);

  // 시작 시 딥링크 처리
  if (process.platform === 'win32') {
    const deeplinkUrl = process.argv.slice(1).find((arg) => arg.startsWith('notray://'));
    if (deeplinkUrl) deeplinkService.handle(deeplinkUrl);
  }
}

// 4. 앱 라이프사이클 이벤트 핸들링
app.whenReady().then(onReady);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    onReady();
  }
});

app.on('open-url', (event, url) => {
  event.preventDefault();
  deeplinkService.handle(url);
});
