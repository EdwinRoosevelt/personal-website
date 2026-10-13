import Link from "next/link";
import { gallery, selects } from "@/content/gallery";
import { ContactSheet } from "@/components/contact-sheet";
import { Section } from "@/components/section";

export function GallerySection() {
  return (
    <Section id="gallery" aside="Photographs, posters, logos and art from college onward.">
      <ContactSheet works={selects} />
      <div className="mt-12 flex justify-center">
        <Link href="/gallery/" className="btn">
          See all {gallery.length} works →
        </Link>
      </div>
    </Section>
  );
}
