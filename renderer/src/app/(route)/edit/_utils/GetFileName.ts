export function getFilename(path: string): string {
  return path.split(/[/\\]/).pop() || '';
}
