import { sections, type SectionId } from "@/content/site";
import { Overprint } from "@/components/overprint";

/** A home-page section with a poster-style overprinted heading. */
export function Section({
  id,
  children,
  aside,
}: {
  id: SectionId;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const section = sections.find((s) => s.id === id)!;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
      <header className="mb-12 grid gap-4 md:mb-16 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="annot mb-4 flex items-center gap-3">
            <span aria-hidden className="h-0.5 w-8 bg-pink" />
            {section.eyebrow}
          </p>
          <h2 id={`${id}-title`} className="display text-5xl sm:text-7xl lg:text-8xl">
            <Overprint>{section.title.toLowerCase()}</Overprint>
          </h2>
        </div>
        {aside && <div className="max-w-xs text-lead md:text-right">{aside}</div>}
      </header>
      {children}
    </section>
  );
}
