/**
 * Words printed twice, blue then pink, a little out of register. The pink
 * pass is CSS generated content, so the text exists once in the document for
 * screen readers, copy and paste, and search engines.
 */
export function Overprint({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`overprint ${className}`} data-text={children}>
      {children}
    </span>
  );
}
