import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { Sheet } from "@/components/sheet";

export function Projects() {
  const major = projects.filter((p) => p.size === "major");
  const mini = projects.filter((p) => p.size === "mini");

  return (
    <Sheet id="projects" aside="Things I've built on my own time, from a live service to weekend experiments.">
      <ul className="space-y-16 md:space-y-24">
        {major.map((p, i) => (
          <li key={p.name}>
            <ProjectRow project={p} flip={i % 2 === 1} />
          </li>
        ))}
      </ul>

      <h3 className="annot mt-24 mb-6 !text-ink">Mini projects</h3>
      <ul className="grid gap-8 sm:grid-cols-2">
        {mini.map((p) => (
          <li key={p.name}>
            <article className="flex h-full flex-col">
              <Plate project={p} sizes="(min-width: 640px) 50vw, 100vw" />
              <div className="mt-4 flex flex-1 flex-col">
                <h4 className="display text-3xl">{p.name}</h4>
                <p className="mt-2 flex-1 text-lead">{p.summary}</p>
                <Footer project={p} />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Sheet>
  );
}

function ProjectRow({ project: p, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="grid items-center gap-8 md:grid-cols-12">
      <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <Plate project={p} sizes="(min-width: 768px) 58vw, 100vw" />
      </div>
      <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <h3 className="display text-5xl md:text-6xl">{p.name}</h3>
        <p className="mt-4 text-lg text-pretty">{p.summary}</p>
        <Footer project={p} />
      </div>
    </article>
  );
}

/** The project's banner in a thin frame; greyed out when the site is offline. */
function Plate({ project: p, sizes }: { project: Project; sizes: string }) {
  return (
    <div className="border border-ink p-1.5">
      <Image
        src={p.image}
        alt={`${p.name} screenshot`}
        placeholder="blur"
        sizes={sizes}
        className={`w-full ${p.href ? "" : "grayscale"}`}
      />
    </div>
  );
}

function Footer({ project: p }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      {p.stack.length > 0 && (
        <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-lead" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
      {p.href ? (
        <a href={p.href} target="_blank" rel="noreferrer" className="btn">
          Open {p.name} ↗
        </a>
      ) : (
        <p className="annot border border-dashed border-lead px-3 py-2">{p.status}</p>
      )}
    </div>
  );
}
