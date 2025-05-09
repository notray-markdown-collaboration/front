export type EditFile = Record<
  string,
  { type: "file" | "folder"; parent: string | null }
>;
