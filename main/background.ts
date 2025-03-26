//main/background.ts
import { app, ipcMain, Menu, nativeTheme } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import electronLocalshortcut from "electron-localshortcut";
import path from "path";
import Store from "electron-store";

const isProd: boolean = process.env.NODE_ENV === "production";
const store = new Store();

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: true, // 해더 숨기기
    // titleBarStyle: 'hidden'// 해더 숨기기
  });
  // const menu =  // 해더 커스텀
  // Menu.buildFromTemplate([
  //   {
  //     label: 'File',
  //     submenu: [
  //       { label: 'Open' },
  //       { label: 'Save' },
  //       { type: 'separator' },
  //       { label: 'Quit', role: 'quit' },
  //     ],
  //   },
  //   {
  //     label: 'Edit',
  //     submenu: [
  //       { label: 'Undo', role: 'undo' },
  //       { label: 'Redo', role: 'redo' },
  //     ],
  //   },
  // ]);
  // Menu.setApplicationMenu(menu);
  Menu.setApplicationMenu(null);

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }

  electronLocalshortcut.register(mainWindow, "F12", () => {
    console.log("toggleDevTools");
    mainWindow.webContents.toggleDevTools();
  });

  ipcMain.handle("dark-mode:toggle", () => {
    const isDarkMode = nativeTheme.shouldUseDarkColors;
    const newTheme = isDarkMode ? "light" : "dark";
    store.set("nativeTheme", newTheme);
    nativeTheme.themeSource = newTheme;
    return newTheme;
  });
  nativeTheme.on("updated", () => {
    mainWindow.webContents.send(
      "dark-mode-changed",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    );
  });
  ipcMain.handle("dark-mode:current", () => {
    const currentTheme =
      store.get("nativeTheme") ??
      (nativeTheme.shouldUseDarkColors ? "dark" : "light");
    console.log("[main] dark-mode:current →", currentTheme);
    return currentTheme;
  });
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send(
      "dark-mode-changed",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    );
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
