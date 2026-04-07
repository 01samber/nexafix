export type MainGalleryKind = "image" | "video";

export interface MainGalleryItem {
  kind: MainGalleryKind;
  src: string;
  alt: string;
  caption: string;
}

/** Media in public/gallery/main. Re-run: node scripts/gen-main-gallery.js */
export const MAIN_GALLERY_ITEMS: MainGalleryItem[] = [
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.56%20AM%20(1).jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.56%20AM%20(2).jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.56%20AM%20(3).jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.56%20AM%20(4).jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.56%20AM%20(5).jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.56%20AM%20(6).jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.56%20AM.jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.57%20AM.jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.58%20AM%20(1).jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.58%20AM%20(2).jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.17.58%20AM.jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "image",
    "src": "/gallery/main/WhatsApp%20Image%202026-04-01%20at%2011.33.14%20AM.jpeg",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.20%20AM%20(1).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.20%20AM.mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.47%20AM%20(1).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.47%20AM%20(2).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.47%20AM%20(3).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.47%20AM%20(5).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.47%20AM%20(6).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.47%20AM.mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.48%20AM%20(1).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.48%20AM%20(2).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.48%20AM%20(3).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.48%20AM%20(4).mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  },
  {
    "kind": "video",
    "src": "/gallery/main/WhatsApp%20Video%202026-04-01%20at%2011.10.48%20AM.mp4",
    "alt": "Nexa Fix project gallery",
    "caption": ""
  }
] as const satisfies MainGalleryItem[];
