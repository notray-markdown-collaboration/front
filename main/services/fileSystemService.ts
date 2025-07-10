import fs from 'fs/promises';
import path from 'path';
import { FileNode } from '../types';

/**
 * 파일 시스템과 관련된 로직(읽기, 쓰기, 탐색 등)을 담당하는 서비스입니다.
 */
class FileSystemService {
  public async readFolderRecursive(folderPath: string): Promise<FileNode> {
    const name = path.basename(folderPath);
    const stats = await fs.stat(folderPath);
    const result: FileNode = {
      name,
      path: folderPath,
      isDirectory: stats.isDirectory(),
      children: [],
    };

    if (!stats.isDirectory()) {
      return result;
    }

    const entries = await fs.readdir(folderPath);
    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry);
      // 재귀적으로 자식 노드를 읽어와 children 배열에 추가합니다.
      result.children!.push(await this.readFolderRecursive(fullPath));
    }
    return result;
  }

  public async readFile(filePath: string): Promise<string> {
    // fs/promises의 readFile은 Promise를 반환하므로 await를 사용합니다.
    return fs.readFile(filePath, 'utf-8');
  }

  public async saveFile(filePath: string, content: string): Promise<void> {
    // fs/promises의 writeFile은 Promise를 반환하므로 await를 사용합니다.
    await fs.writeFile(filePath, content, 'utf-8');
  }

  public async createFile(filePath: string): Promise<void> {
    // 빈 문자열로 파일을 생성합니다.
    await fs.writeFile(filePath, '');
  }

  public async createFolder(folderPath: string): Promise<void> {
    // recursive 옵션을 사용하여 상위 폴더까지 생성합니다.
    await fs.mkdir(folderPath, { recursive: true });
  }
}

export const fileSystemService = new FileSystemService();
