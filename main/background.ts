import {
  app,
  ipcMain,
  Menu,
  nativeTheme,
  shell,
  BrowserWindow,
} from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import electronLocalshortcut from "electron-localshortcut";
import path from "path";
import Store from "electron-store";

const isProd: boolean = process.env.NODE_ENV === "production";
const store = new Store();
// store.set(
//   "refreshToken",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiY2tzYWxzMTAxNEBnbWFpbC5jb20iLCJuYW1lIjoi7LSI7J207YyM7L2UIiwiaWF0IjoxNzQ0NDUyMDU3LCJleHAiOjE3NDU2NjE2NTd9.DLloSgS1Vpo3_gPr8x_rNxp7usNCMapUIISu2aqDJtY"
// );
// store.delete("refreshToken");
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

    electronLocalshortcut.register(mainWindow, "F12", () => {
      mainWindow?.webContents.toggleDevTools();
    });

    ipcMain.handle("dark-mode:toggle", () => {
      const isDarkMode = nativeTheme.shouldUseDarkColors;
      const newTheme = isDarkMode ? "light" : "dark";
      store.set("nativeTheme", newTheme);
      nativeTheme.themeSource = newTheme;
      return newTheme;
    });

    nativeTheme.on("updated", () => {
      mainWindow?.webContents.send(
        "dark-mode-changed",
        nativeTheme.shouldUseDarkColors ? "dark" : "light"
      );
    });

    ipcMain.handle("dark-mode:current", () => {
      return (
        store.get("nativeTheme") ??
        (nativeTheme.shouldUseDarkColors ? "dark" : "light")
      );
    });

    mainWindow.webContents.on("did-finish-load", () => {
      mainWindow?.webContents.send(
        "dark-mode-changed",
        nativeTheme.shouldUseDarkColors ? "dark" : "light"
      );
    });

    ipcMain.on("loadUrl", (event, arg) => {
      shell.openExternal(arg);
    });

    ipcMain.handle("getStore", (event, key: string) => store.get(key));
    ipcMain.handle("setStore", (event, obj) => store.set(obj.key, obj.value));
    ipcMain.handle("deleteStore", (event, key) => store.delete(key));

    ipcMain.on("switch-to-main", () => {
      if (mainWindow) mainWindow.close();
      mainWindow = createWindow("main", {
        width: 1280,
        height: 720,
        webPreferences: {
          preload: path.join(__dirname, "preload.js"),
        },
        frame: true,
      });
      if (isProd) {
        mainWindow.loadURL("app://./main.html");
      } else {
        const port = process.argv[2];
        mainWindow.loadURL(`http://localhost:${port}/main`);
        mainWindow.webContents.openDevTools();
      }
    });
    ipcMain.on("switch-to-start", () => {
      if (mainWindow) mainWindow.close();

      mainWindow = createWindow("start", {
        width: 700,
        height: 470,
        webPreferences: {
          preload: path.join(__dirname, "preload.js"),
        },
        frame: true,
      });

      if (isProd) {
        mainWindow.loadURL("app://./start.html");
      } else {
        const port = process.argv[2];
        mainWindow.loadURL(`http://localhost:${port}/start`);
        mainWindow.webContents.openDevTools();
      }
    });
    app.on("open-url", (event, url) => {
      event.preventDefault();
      handleDeeplink(url);
    });
  });
}

app.on("window-all-closed", () => {
  app.quit();
});

function handleDeeplink(url: string) {
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
