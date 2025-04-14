import {
  app,
  ipcMain,
  Menu,
  nativeTheme,
  shell,
  BrowserWindow,
} from "electron";
import serve from "electron-serve";
import electronLocalshortcut from "electron-localshortcut";
import path from "path";
import Store from "electron-store";
import { createWindow } from "../create-window";
import { SwitchWindow } from "../../types/switch";

export default function SwitchWindowIpc(
  mainWindow: BrowserWindow | null,
  isProd: boolean
) {
  ipcMain.on("switch-window", (event, param: SwitchWindow) => {
    if (mainWindow) mainWindow.close();
    mainWindow = createWindow("main", {
      width: param.width,
      height: param.height,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      frame: true,
    });

    if (isProd) {
      mainWindow.loadURL(`app://./${param.uri}.html`);
    } else {
      const port = process.argv[2];
      mainWindow.loadURL(`http://localhost:${port}/${param.uri}`);
      mainWindow.webContents.openDevTools();
    }
  });
}
