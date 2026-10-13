import type { MetadataRoute } from "next";
import { gallery } from "@/content/gallery";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updated);
  return [
    { url: `${site.url}/`, lastModified, priority: 1 },
    { url: `${site.url}/gallery/`, lastModified, priority: 0.7 },
    ...gallery.map((w) => ({ url: `${site.url}/gallery/${w.slug}/`, lastModified, priority: 0.4 })),
    { url: `${site.url}/edz-central/`, priority: 0.5 },
    { url: `${site.url}/edz-central/privacy/`, priority: 0.3 },
  ];
}
