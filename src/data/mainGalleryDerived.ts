import {
  MAIN_GALLERY_ITEMS,
  type MainGalleryItem,
  type MainGalleryKind,
} from "./mainGallery";

export const MAIN_GALLERY_PHOTOS: MainGalleryItem[] = MAIN_GALLERY_ITEMS.filter(
  (i) => i.kind === "image"
);

export const MAIN_GALLERY_VIDEOS: MainGalleryItem[] = MAIN_GALLERY_ITEMS.filter(
  (i) => i.kind === "video"
);

export function isGalleryItemKind(item: MainGalleryItem, kind: MainGalleryKind): boolean {
  return item.kind === kind;
}
