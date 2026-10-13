"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps its children in a revision cloud: the scalloped redline drawn around
 * whatever changed in the latest revision of a drawing. The cloud sizes itself
 * to the content and draws in the first time it scrolls into view.
 */
export function RevisionCloud({ rev, children }: { rev: string; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    resize.observe(el);
    const view = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          view.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    view.observe(el);
    return () => {
      resize.disconnect();
      view.disconnect();
    };
  }, []);

  const pad = 10;

  return (
    <div ref={box} className="relative">
      {size && (
        <svg
          aria-hidden
          className="pointer-events-none absolute overflow-visible text-redline"
          style={{ left: -pad, top: -pad }}
          width={size.w + pad * 2}
          height={size.h + pad * 2}
        >
          <path
            d={cloudPath(size.w + pad * 2, size.h + pad * 2)}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={drawn ? 0 : 1}
            className="transition-[stroke-dashoffset] duration-[1400ms] ease-in-out motion-reduce:transition-none"
          />
          {/* Revision delta: a triangle carrying the revision letter. */}
          <g
            transform={`translate(${size.w + pad * 2 - 6} ${-6})`}
            className={`transition-opacity delay-[1200ms] duration-300 motion-reduce:delay-0 ${drawn ? "opacity-100" : "opacity-0"}`}
          >
            <path d="M0 -14 L13 9 L-13 9 Z" fill="var(--paper)" stroke="currentColor" strokeWidth={1.5} />
            <text y="6" textAnchor="middle" fill="currentColor" className="font-mono text-[10px] font-medium">
              {rev}
            </text>
          </g>
        </svg>
      )}
      {children}
    </div>
  );
}

/** Clockwise rectangle of outward-bulging arcs, roughly `chord` px apart. */
function cloudPath(w: number, h: number, chord = 26) {
  const r = chord * 0.62;
  const across = Math.max(2, Math.round(w / chord));
  const down = Math.max(2, Math.round(h / chord));
  const dx = w / across;
  const dy = h / down;
  const arc = (x: number, y: number) => `A${r} ${r} 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`;
  const parts = ["M0 0"];
  for (let i = 1; i <= across; i++) parts.push(arc(i * dx, 0));
  for (let i = 1; i <= down; i++) parts.push(arc(w, i * dy));
  for (let i = across - 1; i >= 0; i--) parts.push(arc(i * dx, h));
  for (let i = down - 1; i >= 0; i--) parts.push(arc(0, i * dy));
  return parts.join(" ") + "Z";
}
