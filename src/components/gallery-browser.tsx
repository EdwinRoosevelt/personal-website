"use client";

import { startTransition, useState } from "react";
import { categories, categoryLabels, gallery, type Category } from "@/content/gallery";
import { ContactSheet } from "@/components/contact-sheet";

export function GalleryBrowser() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const works = filter === "all" ? gallery : gallery.filter((w) => w.category === filter);

  const options: { value: Category | "all"; label: string; count: number }[] = [
    { value: "all", label: "All", count: gallery.length },
    ...categories.map((c) => ({
      value: c,
      label: categoryLabels[c],
      count: gallery.filter((w) => w.category === c).length,
    })),
  ];

  return (
    <>
      <div role="group" aria-label="Filter by type" className="mb-10 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={filter === o.value}
            onClick={() => startTransition(() => setFilter(o.value))}
            className="btn !min-h-9 aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {o.label}
            <span className="opacity-60">{o.count}</span>
          </button>
        ))}
      </div>
      <ContactSheet works={works} priority={8} />
    </>
  );
}
