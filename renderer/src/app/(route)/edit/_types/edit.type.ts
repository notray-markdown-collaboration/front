export type EditFile = Record<
  string,
  { type: "file" | "folder"; parent: string | null }
>;

export type FileNode = {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
};