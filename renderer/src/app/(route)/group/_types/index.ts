export interface Folder {
  id: string;
  name: string;
  files: number;
}

export interface FileItem {
  id: number;
  name: string;
  modified: string;
  size: string;
  modifiedBy: string;
}

export interface Member {
  id: number;
  name: string;
  avatar: string;
  color: string;
}
