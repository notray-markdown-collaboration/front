import * as ipc from "./ipc";
import { createWindow } from "./create-window";
import { app, Menu, BrowserWindow } from "electron";
import serve from "electron-serve";
import path from "path";
import Store from "electron-store";
import handleDeeplink from "./utils/deeplink";

export default function Main(
  mainWindow: BrowserWindow | null,
  isProd: boolean,
  deeplinkUrl: string | null
) {
  const store = new Store();
  // store.set(
  //   "refreshToken",
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiY2tzYWxzMTAxNEBnbWFpbC5jb20iLCJuYW1lIjoi7LSI7J207YyM7L2UIiwiaWF0IjoxNzQ0NDUyMDU3LCJleHAiOjE3NDU2NjE2NTd9.DLloSgS1Vpo3_gPr8x_rNxp7usNCMapUIISu2aqDJtY"
  // );
  // store.delete("refreshToken");
  app.whenReady().then(async () => {
    app.setAsDefaultProtocolClient("notray");

    const refreshToken = store.get("refreshToken");
    const initialPage = refreshToken ? "main" : "start";

    mainWindow = createWindow("main", {
      width: refreshToken ? 1280 : 700,
      height: refreshToken ? 720 : 470,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      frame: true,
    });

    Menu.setApplicationMenu(null);

    if (isProd) {
      await mainWindow.loadURL(`app://./${initialPage}.html`);
    } else {
      const port = process.argv[2];
      await mainWindow.loadURL(`http://localhost:${port}/${initialPage}`);
      mainWindow.webContents.openDevTools();
    }

    if (deeplinkUrl) handleDeeplink(deeplinkUrl);

    ipc.DarkModeIpc(mainWindow);
    ipc.StoreIpc();
    ipc.SwitchWindowIpc(mainWindow, isProd);
    ipc.UrlIpc();
    ipc.ToggleDevToolsIpc(mainWindow);
  });
}
