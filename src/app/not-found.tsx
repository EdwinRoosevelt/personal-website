import Link from "next/link";
import { Overprint } from "@/components/overprint";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto grid min-h-[calc(100dvh-3.5rem)] max-w-7xl content-center px-5 py-16 sm:px-8">
      <p className="annot">Error 404 · Misprint</p>
      <h1 className="display mt-4 text-[clamp(5rem,22vw,16rem)]">
        <Overprint>404</Overprint>
      </h1>
      <p className="mt-6 max-w-md text-lg text-lead">
        There&rsquo;s nothing at this address. It may have moved when the site was reprinted.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-solid">
          Go to the home page
        </Link>
        <Link href="/gallery/" className="btn">
          Browse the gallery
        </Link>
      </div>
    </main>
  );
}
