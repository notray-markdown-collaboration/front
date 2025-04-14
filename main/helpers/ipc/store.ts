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

export default function StoreIpc() {
  const store = new Store();
  ipcMain.handle("getStore", (event, key: string) => store.get(key));
  ipcMain.handle("setStore", (event, obj) => store.set(obj.key, obj.value));
  ipcMain.handle("deleteStore", (event, key) => store.delete(key));
}
