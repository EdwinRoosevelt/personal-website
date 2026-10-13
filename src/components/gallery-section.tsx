import Link from "next/link";
import { gallery, selects } from "@/content/gallery";
import { ContactSheet } from "@/components/contact-sheet";
import { Sheet } from "@/components/sheet";

export function GallerySection() {
  return (
    <Sheet id="gallery" aside="Photographs, posters, logos and art from college onward.">
      <ContactSheet works={selects} />
      <div className="mt-12 flex justify-center">
        <Link href="/gallery/" className="btn">
          See all {gallery.length} works →
        </Link>
      </div>
    </Sheet>
  );
}
