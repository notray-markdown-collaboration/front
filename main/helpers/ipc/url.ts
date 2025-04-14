import { app, ipcMain, shell } from "electron";
import handleDeeplink from "../utils/deeplink";

export default function UrlIpc() {
  ipcMain.on("loadUrl", (event, arg) => {
    shell.openExternal(arg);
  });

  app.on("open-url", (event, url) => {
    event.preventDefault();
    handleDeeplink(url);
  });
}
