const columns = ["1", "2", "3", "4", "5", "6", "7", "8"];
const rows = ["A", "B", "C", "D", "E", "F"];

/**
 * The drawing-sheet border: a fixed frame with zone references along the
 * edges, like the grid used to locate details on an engineering drawing.
 * Decorative only, so it is hidden from assistive tech and from small screens.
 */
export function Frame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-2 z-30 hidden border border-ink/25 md:block print:hidden"
    >
      <div className="absolute inset-x-0 -top-px flex -translate-y-full">
        {columns.map((c) => (
          <Zone key={c} label={c} axis="x" />
        ))}
      </div>
      <div className="absolute inset-y-0 -left-px flex -translate-x-full flex-col">
        {rows.map((r) => (
          <Zone key={r} label={r} axis="y" />
        ))}
      </div>
      <div className="absolute inset-y-0 -right-px flex translate-x-full flex-col">
        {rows.map((r) => (
          <Zone key={r} label={r} axis="y" />
        ))}
      </div>
    </div>
  );
}

function Zone({ label, axis }: { label: string; axis: "x" | "y" }) {
  return (
    <div
      className={
        axis === "x"
          ? "flex h-2 flex-1 items-center justify-center border-r border-ink/25 last:border-r-0"
          : "flex w-2 flex-1 items-center justify-center border-b border-ink/25 last:border-b-0"
      }
    >
      <span className="font-mono text-[7px] leading-none text-lead">{label}</span>
    </div>
  );
}
