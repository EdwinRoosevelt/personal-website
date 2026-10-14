/** Edwin's ER monogram: three stacked bevels inside a circle, redrawn as a line mark. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none" stroke="currentColor">
      <circle cx="32" cy="32" r="30" strokeWidth="2" />
      <path d="M12 18h40l-6 9.5H18z" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M19 32h26l-5.5 9H24.5z" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 45.5h26L35 53H19z" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
