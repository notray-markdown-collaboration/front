import {
  app,
  ipcMain,
  Menu,
  nativeTheme,
  shell,
  BrowserWindow,
} from "electron";
import path from "path";
import Store from "electron-store";

export default function DarkModeIpc(mainWindow: BrowserWindow | null) {
  const store = new Store();
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

  mainWindow?.webContents.on("did-finish-load", () => {
    mainWindow?.webContents.send(
      "dark-mode-changed",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    );
  });
}
