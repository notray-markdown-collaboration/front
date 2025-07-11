import { ReadingFile } from "@/_types/readingFile";
import { create } from "zustand";

interface SelectedFile {
  selectedFile: ReadingFile | null;
  setSelectedFile: (file: ReadingFile | null) => void;
  targetUrl: string;
  setTargetUrl: (url: string) => void
}

export const useReadingFileStore = create<SelectedFile>((set, get) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({selectedFile: file}),
  targetUrl: '',
  setTargetUrl: (url) => set({targetUrl: url}),
}));
