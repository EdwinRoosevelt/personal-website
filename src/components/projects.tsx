import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { Sheet } from "@/components/sheet";

export function Projects() {
  const major = projects.filter((p) => p.size === "major");
  const mini = projects.filter((p) => p.size === "mini");

  return (
    <Sheet id="projects" aside="Things I've built on my own time, from a daily-use app to weekend experiments.">
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

/** The project's banner in a thin frame, or a drawn plate when there's no banner. */
function Plate({ project: p, sizes }: { project: Project; sizes: string }) {
  return (
    <div className="border border-ink p-1.5">
      {p.image ? (
        <Image
          src={p.image}
          alt={`${p.name} screenshot`}
          placeholder="blur"
          sizes={sizes}
          className={`w-full ${p.href ? "" : "grayscale"}`}
        />
      ) : (
        <div className="graph relative grid aspect-[12/7] place-items-center overflow-hidden bg-paper-2">
          <PhoneDrawing />
        </div>
      )}
    </div>
  );
}

/**
 * Life Record, the Edz Central Android app, drawn as a two-view orthographic
 * projection: front and side, with centre lines and view labels.
 */
function PhoneDrawing() {
  const centre = "stroke-construction [stroke-dasharray:14_4_2_4]";
  return (
    <svg viewBox="0 0 360 210" className="h-[82%] w-auto text-ink" role="img" aria-label="Drawing of the Life Record Android app">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Front view */}
        <rect x="110" y="15" width="84" height="168" rx="12" />
        <rect x="117" y="30" width="70" height="138" rx="3" strokeWidth="1" />
        <circle cx="152" cy="22.5" r="2" strokeWidth="1" />
        {/* A timeline on the screen: a day marker, then entries. */}
        <g strokeWidth="1">
          <path d="M126 44h20" className="stroke-redline" />
          {[40, 30, 36, 26, 34].map((w, i) => (
            <g key={i}>
              <circle cx="128" cy={60 + i * 22} r="2.5" />
              <path d={`M136 ${58 + i * 22}h${w}M136 ${64 + i * 22}h20`} className="stroke-lead" />
            </g>
          ))}
          <path d="M128 66.5v10M128 88.5v10M128 110.5v10M128 132.5v10" className="stroke-lead" />
        </g>
        {/* Side view */}
        <rect x="236" y="15" width="10" height="168" rx="4" />
        <path d="M246 60v18M246 88v10" strokeWidth="2.5" />
      </g>
      {/* Centre lines */}
      <g strokeWidth="0.75" className={centre}>
        <path d="M152 5v188M100 99h104" />
        <path d="M241 5v188M228 99h26" />
      </g>
      <g className="fill-lead font-mono text-[7px] tracking-[0.12em]">
        <text x="152" y="203" textAnchor="middle">FRONT</text>
        <text x="241" y="203" textAnchor="middle">SIDE</text>
        <text x="14" y="16">LIFE RECORD · ANDROID</text>
      </g>
    </svg>
  );
}

function Footer({ project: p }: { project: Project }) {
  const external = p.href?.startsWith("http");
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
        external ? (
          <a href={p.href} target="_blank" rel="noreferrer" className="btn">
            Open {p.name} ↗
          </a>
        ) : (
          <Link href={p.href} className="btn">
            About {p.name} →
          </Link>
        )
      ) : (
        <p className="annot border border-dashed border-lead px-3 py-2">{p.status}</p>
      )}
    </div>
  );
}
