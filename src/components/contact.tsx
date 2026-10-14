import { site, socials } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { Sheet } from "@/components/sheet";

export function Contact() {
  return (
    <Sheet id="contact">
      <div className="grid gap-14 md:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div>
          <p className="text-2xl leading-snug text-pretty">
            Hiring, collaborating, or just want to talk about the universe over coffee? Write to me.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 block font-mono text-base break-all underline decoration-redline decoration-2 underline-offset-4 hover:text-redline sm:text-lg"
          >
            {site.email}
          </a>
          <dl className="mt-10 border-t border-ink">
            {socials.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-ink/20 py-2.5">
                <dt className="annot">{s.label}</dt>
                <dd>
                  <a href={s.href} target="_blank" rel="noreferrer me" className="font-mono text-sm hover:text-redline hover:underline">
                    {s.handle} ↗
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <ContactForm />
      </div>

      <footer className="mt-28 flex flex-wrap justify-between gap-4 border-t border-ink pt-4 font-mono text-xs text-lead">
        <p>© {new Date(site.issued).getFullYear()} {site.name}</p>
        <nav aria-label="Footer" className="flex gap-5">
          <a href="/edz-central/" className="hover:text-redline hover:underline">Edz Central</a>
          <a href="/edz-central/privacy/" className="hover:text-redline hover:underline">Edz Central privacy policy</a>
        </nav>
      </footer>
    </Sheet>
  );
}
