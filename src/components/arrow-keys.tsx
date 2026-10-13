"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Left/right step through works; Escape returns to the contact sheet. */
export function ArrowKeys({ prev, next, up }: { prev: string; next: string; up: string }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(prev);
    router.prefetch(next);

    function onKey(e: KeyboardEvent) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, dialog[open]")) return;
      if (e.key === "ArrowLeft") router.push(prev, { scroll: false });
      else if (e.key === "ArrowRight") router.push(next, { scroll: false });
      else if (e.key === "Escape") router.push(up);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prev, next, up]);

  return null;
}
