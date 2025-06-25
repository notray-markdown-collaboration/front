
import { registerFileSystemHandlers } from './fileSystemHandler';
import { registerStoreHandlers } from './storeHandler';
import { registerThemeHandlers } from './themeHandler';
import { registerWindowHandlers } from './windowHandler';


/**
 * 앱에서 사용할 모든 IPC 핸들러를 등록하는 함수입니다.
 * background.ts에서 이 함수 하나만 호출하면 됩니다.
 */
export function initializeIpcHandlers() {
  console.log('🔌 IPC 핸들러 초기화 중...');
  registerFileSystemHandlers();
  registerStoreHandlers();
  registerThemeHandlers();
  registerWindowHandlers();
  console.log('✅ IPC 핸들러 초기화 완료.');
}
