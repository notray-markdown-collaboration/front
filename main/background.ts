import { app, Menu, BrowserWindow } from "electron";
import serve from "electron-serve";
import path from "path";
import Store from "electron-store";
import handleDeeplink from "./helpers/utils/deeplink";
import Main from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let deeplinkUrl: string | null = null;
let mainWindow: BrowserWindow | null = null;

if (process.platform === "win32") {
  const args = process.argv.slice(1);
  deeplinkUrl = args.find((arg) => arg.startsWith("notray://")) ?? null;
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, argv) => {
    if (process.platform === "win32") {
      const url = argv.find((arg) => arg.startsWith("notray://"));
      if (url) handleDeeplink(url);
    }
  });
}

Main(mainWindow, isProd, deeplinkUrl);

app.on("window-all-closed", () => {
  app.quit();
});
