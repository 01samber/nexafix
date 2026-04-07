import captionPool from "./projectGalleryCaptions.json";

export const PROJECT_GALLERY_CAPTIONS: readonly string[] = captionPool;

export function projectGalleryCaptionAt(index: number): string {
  const pool = captionPool as string[];
  if (pool.length === 0) return "";
  return pool[index % pool.length] ?? "";
}
