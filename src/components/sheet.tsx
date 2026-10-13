import { sheets, type SheetId } from "@/content/site";

/** A home-page section, headed like a sheet in a drawing set. */
export function Sheet({
  id,
  children,
  aside,
}: {
  id: SheetId;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const index = sheets.findIndex((s) => s.id === id);
  const sheet = sheets[index];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <header className="mb-10 grid gap-4 border-b border-ink pb-4 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="annot mb-3">
            Sheet {index + 1} of {sheets.length} · {sheet.drafting}
          </p>
          <h2 id={`${id}-title`} className="display text-6xl sm:text-7xl">
            {sheet.title}
          </h2>
        </div>
        {aside && <div className="text-sm text-lead md:max-w-sm md:text-right">{aside}</div>}
      </header>
      {children}
    </section>
  );
}
