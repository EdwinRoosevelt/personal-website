"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sections, site } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";

const links = sections.filter((s) => s.id !== "top");

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const d = dialog.current;
        if (d?.open) d.close();
        else d?.showModal();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = (id: string) =>
    (onHome && active === id) || (id === "gallery" && pathname.startsWith("/gallery"));

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/90 backdrop-blur-md print:hidden">
        <nav aria-label="Site" className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
          <Link href="/" className="display mr-auto text-sm tracking-tight sm:text-base">
            edwin roosevelt
          </Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/#${s.id}`}
                  aria-current={current(s.id) ? "location" : undefined}
                  className="annot relative rounded-full px-3 py-2 !text-ink hover:bg-paper-2 aria-[current]:bg-pink aria-[current]:!text-[#1c2238]"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            aria-haspopup="dialog"
            className="annot flex h-10 items-center gap-2 rounded-full border-2 border-ink px-4 !text-ink hover:bg-paper-2 lg:hidden"
          >
            Menu
          </button>
        </nav>
      </header>

      <Menu ref={dialog} isCurrent={current} />
    </>
  );
}

function Menu({
  ref,
  isCurrent,
}: {
  ref: React.Ref<HTMLDialogElement>;
  isCurrent: (id: string) => boolean;
}) {
  function close(e: React.MouseEvent) {
    (e.currentTarget.closest("dialog") as HTMLDialogElement | null)?.close();
  }

  return (
    <dialog
      ref={ref}
      aria-label="Sections"
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-3xl border-2 border-ink bg-paper p-0 text-ink backdrop:bg-[#1c2238]/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-6 pt-5">
        <h2 className="annot">Sections</h2>
        <button type="button" onClick={close} className="annot !text-ink hover:underline">
          Close
        </button>
      </div>
      <ul className="px-3 py-3">
        {links.map((s) => (
          <li key={s.id}>
            <Link
              href={`/#${s.id}`}
              onClick={close}
              aria-current={isCurrent(s.id) ? "location" : undefined}
              className="group flex items-baseline justify-between rounded-2xl px-3 py-2 hover:bg-paper-2"
            >
              <span className="display text-3xl group-aria-[current]:text-pink-text">{s.title}</span>
              <span className="annot">{s.eyebrow}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-ink px-6 py-4">
        <Link href="/gallery/" onClick={close} className="annot !text-ink underline">
          All work
        </Link>
        <a href={site.resume} target="_blank" rel="noreferrer" className="annot !text-ink underline">
          Résumé ↗
        </a>
      </div>
    </dialog>
  );
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    if (!enabled) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    // A section becomes active when it crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}
