import type { Metadata } from "next";
import Link from "next/link";
import { Overprint } from "@/components/overprint";
import { GalleryBrowser } from "@/components/gallery-browser";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs, posters, logos and art by Edwin Roosevelt.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 md:pt-24">
      <Link href="/#gallery" className="annot hover:!text-pink-text">
        ← Back home
      </Link>
      <header className="mt-6 mb-10">
        <p className="annot mb-4">Prints · photographs, posters, logos and art</p>
        <h1 className="display text-6xl sm:text-8xl">
          <Overprint>gallery</Overprint>
        </h1>
      </header>
      <GalleryBrowser />
    </main>
  );
}
