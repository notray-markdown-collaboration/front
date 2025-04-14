import { BrowserWindow } from "electron";
import electronLocalshortcut from "electron-localshortcut";

export default function ToggleDevToolsIpc(mainWindow: BrowserWindow | null) {
  if (mainWindow)
    electronLocalshortcut.register(mainWindow, "F12", () => {
      mainWindow?.webContents.toggleDevTools();
    });
}
