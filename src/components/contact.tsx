import { site, socials } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";

export function Contact() {
  return (
    <Section id="contact">
      <p className="max-w-2xl text-2xl leading-snug font-semibold text-pretty sm:text-3xl">
        Hiring, collaborating, or just want to talk about the universe over coffee? Write to me.
      </p>
      <a
        href={`mailto:${site.email}`}
        className="display mt-8 inline-block text-[clamp(1.1rem,4.4vw,3.25rem)] break-all text-blue decoration-pink decoration-4 underline-offset-8 hover:underline"
      >
        {site.email}
      </a>

      <div className="mt-16 grid gap-14 md:grid-cols-[1fr_1.5fr] lg:gap-24">
        <ul aria-label="Elsewhere" className="flex flex-wrap content-start gap-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer me"
                className="btn"
                aria-label={`${s.label}: ${s.handle}`}
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>

      <footer className="mt-28 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-5">
        <p className="annot">
          © {new Date(site.updated).getFullYear()} {site.name} · Printed in two inks
        </p>
        <nav aria-label="Footer" className="flex gap-5">
          <a href="/edz-central/" className="annot !text-ink hover:underline">
            Edz Central
          </a>
          <a href="/edz-central/privacy/" className="annot !text-ink hover:underline">
            Edz Central privacy policy
          </a>
        </nav>
      </footer>
    </Section>
  );
}
