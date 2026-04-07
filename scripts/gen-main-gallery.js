const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../public/gallery/main");
const outFile = path.join(__dirname, "../src/data/mainGallery.ts");
const captionPool = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/data/projectGalleryCaptions.json"), "utf8")
);

const files = fs
  .readdirSync(dir)
  .filter((f) => fs.statSync(path.join(dir, f)).isFile())
  .sort();

const items = files.map((name, i) => {
  const ext = path.extname(name).toLowerCase();
  const kind = [".mp4", ".webm", ".mov", ".m4v"].includes(ext) ? "video" : "image";
  return {
    kind,
    src: `/gallery/main/${encodeURIComponent(name)}`,
    alt: "Nexa Fix project gallery",
    caption: captionPool[i % captionPool.length],
  };
});

const header = `export type MainGalleryKind = "image" | "video";

export interface MainGalleryItem {
  kind: MainGalleryKind;
  src: string;
  alt: string;
  caption: string;
}

/** Media in public/gallery/main — re-run: node scripts/gen-main-gallery.js */
export const MAIN_GALLERY_ITEMS: MainGalleryItem[] = `;

fs.writeFileSync(outFile, header + JSON.stringify(items, null, 2) + " as const satisfies MainGalleryItem[];\n", "utf8");
console.log("Wrote", outFile, items.length, "items");
