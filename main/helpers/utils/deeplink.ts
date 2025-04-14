import { BrowserWindow } from "electron";

export default function handleDeeplink(url: string) {
  try {
    const parsed = new URL(url);
    const accessToken = parsed.searchParams.get("accessToken");
    const refreshToken = parsed.searchParams.get("refreshToken");

    const windows = BrowserWindow.getAllWindows();
    if (windows.length > 0) {
      windows[0].webContents.send("oauth-token", {
        accessToken,
        refreshToken,
      });
    }
  } catch (err) {
    console.error("❌ 잘못된 딥링크 URL입니다:", url);
  }
}
