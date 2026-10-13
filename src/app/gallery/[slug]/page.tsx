import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { categoryLabels, gallery, getWork } from "@/content/gallery";
import { frameLabel } from "@/components/contact-sheet";
import { ArrowKeys } from "@/components/arrow-keys";

export function generateStaticParams() {
  return gallery.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};
  const description = `${categoryLabels[work.category].replace(/s$/, "")} by Edwin Roosevelt.`;
  return {
    title: work.title,
    description,
    alternates: { canonical: `/gallery/${work.slug}/` },
    openGraph: { title: work.title, description, images: [{ url: work.image.src }] },
  };
}

export default async function WorkPage({ params }: PageProps<"/gallery/[slug]">) {
  const work = getWork((await params).slug);
  if (!work) notFound();

  const i = gallery.indexOf(work);
  const prev = gallery[(i - 1 + gallery.length) % gallery.length];
  const next = gallery[(i + 1) % gallery.length];

  return (
    <main id="main" className="mx-auto flex max-w-6xl flex-col px-5 pt-14 pb-10 sm:px-8 md:pt-20">
      <Link href="/gallery/" className="annot self-start hover:!text-pink-text">
        ← All prints
      </Link>

      <figure className="mt-6 grid gap-6 md:grid-cols-[1fr_15rem] md:items-end">
        <div className="flex justify-center rounded-[1.75rem] border-2 border-ink bg-paper-2 p-3">
          <ViewTransition name={`work-${work.slug}`}>
            <Image
              src={work.image}
              alt={work.title}
              placeholder="blur"
              priority
              sizes="(min-width: 768px) 60rem, 100vw"
              className="h-auto max-h-[calc(100dvh-14rem)] w-auto rounded-xl object-contain"
            />
          </ViewTransition>
        </div>
        <figcaption>
          <p className="annot">
            Print {frameLabel(work)} · {categoryLabels[work.category]}
          </p>
          <h1 className="display mt-3 text-4xl">{work.title}</h1>
          <nav aria-label="Other works" className="mt-8 flex gap-2">
            <Link href={`/gallery/${prev.slug}/`} className="btn" rel="prev">
              ← Previous
            </Link>
            <Link href={`/gallery/${next.slug}/`} className="btn" rel="next">
              Next →
            </Link>
          </nav>
          <p className="annot mt-3 hidden md:block">Arrow keys work too</p>
        </figcaption>
      </figure>
      <ArrowKeys prev={`/gallery/${prev.slug}/`} next={`/gallery/${next.slug}/`} up="/gallery/" />
    </main>
  );
}
