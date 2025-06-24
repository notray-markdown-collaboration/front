import fs from 'fs';
import path from 'path';
import { FileNode } from '../types';

/**
 * 파일 시스템과 관련된 로직(읽기, 쓰기, 탐색 등)을 담당하는 서비스입니다.
 */
class FileSystemService {
  public readFolderRecursive(folderPath: string): FileNode {
    const entries = fs.readdirSync(folderPath);
    const result: FileNode = {
      name: path.basename(folderPath),
      path: folderPath,
      isDirectory: true,
      children: [],
    };

    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        result.children!.push(this.readFolderRecursive(fullPath));
      } else {
        result.children!.push({ name: entry, path: fullPath, isDirectory: false });
      }
    }
    return result;
  }

  public readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }
}

export const fileSystemService = new FileSystemService();
