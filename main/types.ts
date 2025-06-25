// FileSystemService에서 사용하는 타입
export type FileNode = {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
};

// WindowService에서 사용하는 타입 (기존 types/switch.ts)
export interface SwitchWindowParams {
  isFullScreen?: boolean;
  isFixed?: boolean;
  width: number;
  height: number;
  uri: string;
}
