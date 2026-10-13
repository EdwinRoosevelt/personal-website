import { site } from "@/content/site";

/**
 * The name, drawn and dimensioned. A dimension line spans the name with the
 * span of the career; leader lines run down from it to callouts that point
 * at the sections below.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="top-title"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="graph absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      />
      <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-6xl flex-col justify-center px-5 pt-16 pb-24 sm:px-8">
        <p className="annot anim-fade mb-10 flex flex-wrap gap-x-6 gap-y-1">
          <span>General arrangement</span>
          <span>Scale 1:1</span>
          <span>{site.location}</span>
        </p>

        <div className="w-fit max-w-full">
          <Dimension label="Mar 2021 → today · building for the web" />

          <h1 id="top-title" className="display text-[clamp(4.5rem,19vw,15rem)] text-ink">
            <span className="block">Edwin</span>
            <span className="block">Roosevelt</span>
          </h1>

          <ol className="mt-8 grid gap-x-8 gap-y-4 sm:mt-0 sm:grid-cols-3" aria-label="At a glance">
            <Callout n={1} href="#career" delay={900}>
              Full-stack developer at Beanstalk, Kolkata
            </Callout>
            <Callout n={2} href="#about" delay={1050}>
              Mechanical engineer by degree, Amrita &rsquo;19
            </Callout>
            <Callout n={3} href="#gallery" delay={1200}>
              Photographer, poster and logo designer
            </Callout>
          </ol>
        </div>

        <div
          className="anim-fade mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          style={{ "--delay": "1400ms" } as React.CSSProperties}
        >
          <p className="max-w-xl text-lg text-pretty">
            I build web products end to end, from the React interface down to the Node service and
            the server it runs on. Before that I was an SRE, keeping SonyLIV&rsquo;s streaming
            platform healthy.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-solid">
              Get in touch
            </a>
            <a href={site.resume} target="_blank" rel="noreferrer" className="btn">
              Résumé ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A dimension line: extension ticks at both ends, arrowheads, label in the gap. */
function Dimension({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-redline" aria-hidden>
      <span className="h-5 w-px bg-current" />
      <span className="anim-draw-x relative h-px flex-1 origin-left bg-current" style={{ "--delay": "200ms" } as React.CSSProperties}>
        <span className="absolute top-1/2 left-0 size-0 -translate-y-1/2 border-y-[4px] border-r-[9px] border-y-transparent border-r-current" />
      </span>
      <span className="anim-fade font-mono text-[0.7rem] tracking-wider whitespace-nowrap uppercase" style={{ "--delay": "700ms" } as React.CSSProperties}>
        {label}
      </span>
      <span className="anim-draw-x relative h-px flex-1 origin-right bg-current" style={{ "--delay": "200ms" } as React.CSSProperties}>
        <span className="absolute top-1/2 right-0 size-0 -translate-y-1/2 border-y-[4px] border-l-[9px] border-y-transparent border-l-current" />
      </span>
      <span className="h-5 w-px bg-current" />
    </div>
  );
}

/** A numbered balloon on a leader line, as used to call out parts on a drawing. */
function Callout({
  n,
  href,
  delay,
  children,
}: {
  n: number;
  href: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <li className="relative sm:pt-12">
      {/* Leader: a dot on the name, a line down to the balloon. */}
      <span
        aria-hidden
        className="anim-draw-y absolute top-1 left-[0.9rem] hidden h-10 w-px bg-ink sm:block"
        style={{ "--delay": `${delay - 300}ms` } as React.CSSProperties}
      />
      <span aria-hidden className="absolute top-0 left-[0.9rem] hidden size-2 -translate-x-[3.5px] rounded-full bg-ink sm:block" />
      <a
        href={href}
        className="anim-fade group flex items-start gap-3"
        style={{ "--delay": `${delay}ms` } as React.CSSProperties}
      >
        <span className="grid size-[1.85rem] shrink-0 place-items-center rounded-full border-[1.5px] border-ink font-mono text-xs group-hover:border-redline group-hover:text-redline">
          {n}
        </span>
        <span className="pt-1 text-sm leading-snug text-pretty underline-offset-4 group-hover:underline">
          {children}
        </span>
      </a>
    </li>
  );
}
