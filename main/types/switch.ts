import { BrowserWindow } from "electron";

export interface SwitchWindow {
  isFullScreen?: boolean;
  isFixed?: boolean;
  width: number;
  height: number;
  uri: string;
}
