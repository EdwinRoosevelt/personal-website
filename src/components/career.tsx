import { education, revisions, type Revision } from "@/content/career";
import { Section } from "@/components/section";

/** Career as a gig poster's tour dates, newest first. */
export function Career() {
  const latestFirst = [...revisions].reverse();

  return (
    <Section id="career" aside="Newest first. The pink marker is where I am now.">
      <ol className="border-t-2 border-ink">
        {latestFirst.map((r) => (
          <li key={r.rev} className="border-b-2 border-ink">
            <Row r={r} />
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-10 md:grid-cols-[12rem_1fr]">
        <h3 className="annot">Education</h3>
        <ul className="grid gap-10 sm:grid-cols-2">
          {education.map((e) => (
            <li key={e.title}>
              <p className="annot">{e.years}</p>
              <p className="mt-2 text-xl leading-snug font-semibold">{e.title}</p>
              <p className="text-lead">
                {e.school} · {e.grade}
              </p>
              {e.notes && <p className="mt-2 text-sm text-lead">{e.notes}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Row({ r }: { r: Revision }) {
  const current = r.to === null;
  return (
    <article className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-[13rem_1fr_10rem] md:py-10">
      <div>
        <p className="font-mono text-sm font-medium">
          {r.from} – {r.to ?? "now"}
        </p>
        {current && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-pink px-3 py-1 font-mono text-[0.65rem] font-medium tracking-wider text-[#1c2238] uppercase">
            <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-[#1c2238] motion-reduce:animate-none" />
            Now playing
          </p>
        )}
      </div>
      <div>
        <h3 className="display text-2xl leading-tight sm:text-3xl">
          <span className={current ? "highlight" : undefined}>{r.role}</span>
        </h3>
        <p className="mt-1 text-lead">{r.org}</p>
        <ul className="mt-4 space-y-1.5">
          {r.notes.map((n) => (
            <li key={n} className="flex gap-3">
              <span aria-hidden className="text-pink-text">
                ✶
              </span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="annot md:pt-1.5 md:text-right">{r.place}</p>
    </article>
  );
}
