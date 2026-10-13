import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="graph grid min-h-[calc(100dvh-3.5rem)] place-items-center px-5">
      <div className="max-w-lg border border-ink bg-paper p-8 sm:p-10">
        <p className="annot !text-redline">Error 404 · Sheet missing from set</p>
        <h1 className="display mt-3 text-6xl sm:text-7xl">Page not found</h1>
        <p className="mt-4 text-lead">
          There&rsquo;s nothing at this address. It may have moved when the site was redrawn.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-solid">
            Go to the home page
          </Link>
          <Link href="/gallery/" className="btn">
            Browse the gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
