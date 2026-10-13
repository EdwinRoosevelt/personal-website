import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { Section } from "@/components/section";

export function Projects() {
  const major = projects.filter((p) => p.size === "major");
  const mini = projects.filter((p) => p.size === "mini");

  return (
    <Section id="projects" aside="Things I've built on my own time, from a live service to weekend experiments.">
      <ul className="space-y-20 md:space-y-28">
        {major.map((p, i) => (
          <li key={p.name}>
            <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <Plate project={p} sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
              <div className={`md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
                <h3 className="display text-4xl sm:text-5xl">{p.name}</h3>
                <p className="mt-5 text-lg text-pretty">{p.summary}</p>
                <Footer project={p} />
              </div>
            </article>
          </li>
        ))}
      </ul>

      <h3 className="annot mt-28 mb-8">B-sides: mini projects</h3>
      <ul className="grid gap-10 sm:grid-cols-2">
        {mini.map((p) => (
          <li key={p.name}>
            <article className="flex h-full flex-col">
              <Plate project={p} sizes="(min-width: 640px) 50vw, 100vw" />
              <div className="mt-5 flex flex-1 flex-col">
                <h4 className="display text-3xl">{p.name}</h4>
                <p className="mt-3 flex-1 text-lead">{p.summary}</p>
                <Footer project={p} />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The screenshot, printed halftone; it links to the project while the site is up. */
function Plate({ project: p, sizes }: { project: Project; sizes: string }) {
  const image = (
    <div className="halftone rounded-[1.75rem] border-2 border-ink">
      <Image
        src={p.image}
        alt={`${p.name} screenshot`}
        placeholder="blur"
        sizes={sizes}
        className="w-full transition-[scale] duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
      />
    </div>
  );
  if (!p.href) return image;
  return (
    <a href={p.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className="group block">
      {image}
    </a>
  );
}

function Footer({ project: p }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      {p.stack.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s} className="annot rounded-full bg-paper-2 px-2.5 py-1">
              {s}
            </li>
          ))}
        </ul>
      )}
      {p.href ? (
        <a href={p.href} target="_blank" rel="noreferrer" className="btn">
          Open {p.name} ↗
        </a>
      ) : (
        <p className="annot rounded-full border-2 border-dashed border-lead px-4 py-2">{p.status}</p>
      )}
    </div>
  );
}
