import { screen, BrowserWindow, BrowserWindowConstructorOptions, Rectangle } from 'electron';
import Store from 'electron-store';

/**
 * 창의 이전 상태(위치, 크기)를 기억하고 복원하여 BrowserWindow를 생성하는 헬퍼 함수입니다.
 * @param windowName 상태를 저장할 고유한 창 이름
 * @param options BrowserWindow 생성 옵션
 * @returns 생성된 BrowserWindow 인스턴스
 */
export const createWindow = (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  // 각 창마다 별도의 상태 저장소를 사용합니다.
  const store = new Store<Rectangle>({ name: `window-state-${windowName}` });

  const defaultSize = {
    width: options.width ?? 800,
    height: options.height ?? 600,
  };

  let state = store.get('window-state', defaultSize);

  const ensureVisibleOnSomeDisplay = (windowState: Rectangle) => {
    const visible = screen.getAllDisplays().some((display) => {
      const displayBounds = display.bounds;
      return (
        windowState.x >= displayBounds.x &&
        windowState.y >= displayBounds.y &&
        windowState.x + windowState.width <= displayBounds.x + displayBounds.width &&
        windowState.y + windowState.height <= displayBounds.y + displayBounds.height
      );
    });
    if (!visible) {
      // 창이 어떤 디스플레이에도 보이지 않으면 기본 위치로 리셋합니다.
      const bounds = screen.getPrimaryDisplay().bounds;
      return {
        ...defaultSize,
        x: (bounds.width - defaultSize.width) / 2,
        y: (bounds.height - defaultSize.height) / 2,
      };
    }
    return windowState;
  };

  state = ensureVisibleOnSomeDisplay(state as Rectangle);

  const win = new BrowserWindow({
    ...options,
    ...state,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      ...options.webPreferences,
    },
  });

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      store.set('window-state', win.getBounds());
    }
  };

  win.on('close', saveState);

  return win;
};
