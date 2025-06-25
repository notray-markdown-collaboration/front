import { ReadingFile } from "@/app/_types/readingFile";
import { create } from "zustand";

interface SelectedFile {
  selectedFile: ReadingFile | null;
  setSelectedFile: (file: ReadingFile | null) => void;
}

export const useReadingFileStore = create<SelectedFile>((set, get) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({selectedFile: file}),
}));
