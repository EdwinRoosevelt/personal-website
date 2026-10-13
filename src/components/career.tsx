import { education, revisions, type Revision } from "@/content/career";
import { RevisionCloud } from "@/components/revision-cloud";
import { Sheet } from "@/components/sheet";

export function Career() {
  const latestFirst = [...revisions].reverse();

  return (
    <Sheet
      id="career"
      aside={
        <>
          Newest first. The current role is clouded in red, the way changes are marked on a
          revised drawing.
        </>
      }
    >
      <div
        className="annot hidden grid-cols-[4rem_10rem_1fr_9rem] gap-6 border-b border-ink/40 px-4 pb-2 md:grid"
        aria-hidden
      >
        <span>Rev</span>
        <span>Date</span>
        <span>Description</span>
        <span className="text-right">Location</span>
      </div>
      <ol className="space-y-px">
        {latestFirst.map((r) =>
          r.to === null ? (
            <li key={r.rev} className="my-6">
              <RevisionCloud rev={r.rev}>
                <Row r={r} />
              </RevisionCloud>
            </li>
          ) : (
            <li key={r.rev} className="border-b border-ink/20">
              <Row r={r} />
            </li>
          ),
        )}
      </ol>

      <div className="mt-20 grid gap-10 md:grid-cols-[14rem_1fr]">
        <h3 className="annot !text-ink">Education</h3>
        <ul className="grid gap-8 sm:grid-cols-2">
          {education.map((e) => (
            <li key={e.title}>
              <p className="font-mono text-xs text-lead">{e.years}</p>
              <p className="mt-1 text-lg leading-snug font-semibold">{e.title}</p>
              <p className="text-lead">
                {e.school} · {e.grade}
              </p>
              {e.notes && <p className="mt-2 text-sm text-lead">{e.notes}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
}

function Row({ r }: { r: Revision }) {
  const current = r.to === null;
  return (
    <article className="grid gap-x-6 gap-y-2 px-4 py-6 md:grid-cols-[4rem_10rem_1fr_9rem]">
      <p className={`display text-5xl ${current ? "text-redline" : ""}`} aria-label={`Revision ${r.rev}`}>
        {r.rev}
      </p>
      <p className="font-mono text-sm md:pt-1">
        {r.from} – {r.to ?? <strong className="font-medium text-redline">present</strong>}
      </p>
      <div>
        <h3 className="text-xl leading-snug font-semibold">{r.role}</h3>
        <p className="text-lead">{r.org}</p>
        <ul className="mt-3 space-y-1.5 text-[0.95rem]">
          {r.notes.map((n) => (
            <li key={n} className="flex gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-lead" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="font-mono text-sm text-lead md:pt-1 md:text-right">{r.place}</p>
    </article>
  );
}
