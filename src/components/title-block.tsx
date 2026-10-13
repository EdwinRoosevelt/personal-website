"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, sheets } from "@/content/site";
import { Mark } from "@/components/mark";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * The title block from the corner of an engineering drawing, stretched into
 * a fixed strip. It is the site's navigation: it names the section in view,
 * and opens the sheet index.
 */
export function TitleBlock() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSheet(onHome);
  const dialog = useRef<HTMLDialogElement>(null);

  const index = sheets.findIndex((s) => s.id === active);
  const sheet = sheets[index] ?? sheets[0];
  const title = onHome ? sheet.title : pageTitle(pathname);
  const number = onHome ? `${index + 1}/${sheets.length}` : "—";

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

  return (
    <>
      <nav
        aria-label="Site"
        className="fixed inset-x-0 bottom-0 z-40 flex h-14 border-t border-ink/40 bg-paper/90 backdrop-blur-md md:inset-x-2 md:bottom-2 md:border md:border-ink/40 print:hidden"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 border-r border-ink/25 px-3 hover:bg-paper-2 sm:px-4"
        >
          <Mark className="size-7" />
          <span className="hidden leading-tight sm:block">
            <span className="annot block !text-[0.6rem]">Drawn by</span>
            <span className="font-mono text-xs font-medium uppercase">E. Roosevelt</span>
          </span>
        </Link>

        <Cell label="Title" className="min-w-0 flex-1">
          <span aria-live="polite" className="block truncate">
            {title}
            {onHome && (
              <span className="hidden text-lead lg:inline"> · {sheet.drafting}</span>
            )}
          </span>
        </Cell>
        <Cell label="Sheet" className="w-16 sm:w-20">
          {number}
        </Cell>
        <Cell label="Rev" className="hidden w-20 md:flex">
          {site.revision}
        </Cell>
        <Cell label="Issued" className="hidden w-32 xl:flex">
          {site.issued}
        </Cell>
        <ThemeToggle />
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="flex items-center gap-2 px-3 font-mono text-xs uppercase hover:bg-paper-2 sm:px-4"
          aria-haspopup="dialog"
        >
          Index
          <kbd className="hidden rounded-sm border border-ink/30 px-1 text-[0.65rem] text-lead lg:inline">
            ⌘K
          </kbd>
        </button>
      </nav>

      <SheetIndex ref={dialog} active={onHome ? active : null} />
    </>
  );
}

function Cell({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col justify-center border-r border-ink/25 px-3 sm:px-4 ${className}`}>
      <span className="annot !text-[0.6rem] leading-none">{label}</span>
      <span className="mt-1 font-mono text-sm leading-none font-medium uppercase">{children}</span>
    </div>
  );
}

function SheetIndex({
  ref,
  active,
}: {
  ref: React.Ref<HTMLDialogElement>;
  active: string | null;
}) {
  function close(e: React.MouseEvent) {
    (e.currentTarget.closest("dialog") as HTMLDialogElement | null)?.close();
  }

  return (
    <dialog
      ref={ref}
      aria-label="Sheet index"
      onClick={(e) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto w-[min(32rem,calc(100vw-2rem))] border border-ink bg-paper p-0 text-ink backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-ink px-5 py-3">
        <h2 className="annot !text-ink">Sheet index</h2>
        <button type="button" onClick={close} className="annot hover:!text-redline">
          Close <span aria-hidden>✕</span>
        </button>
      </div>
      <ol>
        {sheets.map((s, i) => (
          <li key={s.id} className="border-b border-ink/20">
            <Link
              href={s.id === "top" ? "/" : `/#${s.id}`}
              onClick={close}
              aria-current={active === s.id ? "location" : undefined}
              className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-2 px-5 py-3 hover:bg-paper-2"
            >
              <span className="font-mono text-xs text-lead">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-2xl group-aria-[current]:text-redline">{s.title}</span>
              <span className="annot hidden sm:block">{s.drafting}</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-4 font-mono text-xs uppercase">
        <Link href="/gallery/" onClick={close} className="underline hover:text-redline">
          All work
        </Link>
        <Link href="/edz-central/" onClick={close} className="underline hover:text-redline">
          Edz Central
        </Link>
        <a href={site.resume} target="_blank" rel="noreferrer" className="underline hover:text-redline">
          Résumé ↗
        </a>
      </div>
    </dialog>
  );
}

function useActiveSheet(enabled: boolean) {
  const [active, setActive] = useState<string>(sheets[0].id);

  useEffect(() => {
    if (!enabled) return;
    const sections = sheets
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    // A sheet becomes active when it crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

function pageTitle(pathname: string) {
  if (pathname.startsWith("/gallery")) return "Gallery";
  return "Not found";
}
