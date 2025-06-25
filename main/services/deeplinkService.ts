import { BrowserWindow } from 'electron';

/**
 * 앱의 딥링크(커스텀 프로토콜 URL)를 처리하는 서비스입니다.
 */
class DeeplinkService {
  public handle(url: string) {
    try {
      console.log(`🔗 딥링크 수신: ${url}`);
      const parsedUrl = new URL(url);
      const accessToken = parsedUrl.searchParams.get('accessToken');
      const refreshToken = parsedUrl.searchParams.get('refreshToken');

      // 열려있는 창에 토큰 정보를 전달
      const windows = BrowserWindow.getAllWindows();
      if (windows.length > 0) {
        windows[0].webContents.send('oauth-token', { accessToken, refreshToken });
        console.log('✅ 딥링크 토큰을 렌더러로 전송했습니다.');
      }
    } catch (err) {
      console.error('❌ 잘못된 딥링크 URL입니다:', url, err);
    }
  }
}

export const deeplinkService = new DeeplinkService();
