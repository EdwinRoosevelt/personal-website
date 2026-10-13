"use client";

import { useRef } from "react";

/**
 * Lets the pointer knock the pink pass out of register, a few pixels at most,
 * as if the second drum slipped. Skipped for reduced motion and touch.
 */
export function RegistrationDrift({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--dx", `calc(0.045em + ${(x * 12).toFixed(1)}px)`);
    el.style.setProperty("--dy", `calc(0.03em + ${(y * 8).toFixed(1)}px)`);
  }

  function onPointerLeave() {
    ref.current?.style.removeProperty("--dx");
    ref.current?.style.removeProperty("--dy");
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {children}
    </div>
  );
}
