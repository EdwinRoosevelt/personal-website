import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { categoryLabels, gallery, type Work } from "@/content/gallery";

/**
 * Thumbnails printed halftone in blue, each with its print number. Hover or
 * focus brings back the colour; selecting one morphs it into its own page.
 */
export function ContactSheet({ works, priority = 0 }: { works: Work[]; priority?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
      {works.map((w, i) => (
        <li key={w.slug}>
          <Link href={`/gallery/${w.slug}/`} className="group block">
            <div className="halftone aspect-square rounded-2xl">
              <ViewTransition name={`work-${w.slug}`}>
                <Image
                  src={w.image}
                  alt={w.title}
                  placeholder="blur"
                  priority={i < priority}
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 33vw, 50vw"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </ViewTransition>
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <span className="truncate text-sm font-medium group-hover:underline">{w.title}</span>
              <span className="annot shrink-0">{frameLabel(w)}</span>
            </div>
            <span className="sr-only">{categoryLabels[w.category]}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function frameLabel(w: Work) {
  return `${String(w.frame).padStart(2, "0")}/${gallery.length}`;
}
