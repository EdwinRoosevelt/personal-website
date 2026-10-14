import { About } from "@/components/about";
import { Career } from "@/components/career";
import { Contact } from "@/components/contact";
import { GallerySection } from "@/components/gallery-section";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { revisions } from "@/content/career";
import { site, socials } from "@/content/site";

const current = revisions.find((r) => r.to === null);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  worksFor: current && { "@type": "Organization", name: current.org },
  address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressCountry: "IN" },
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "Amrita Vishwa Vidyapeetham" }],
  sameAs: socials.map((s) => s.href),
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Career />
      <Projects />
      <GallerySection />
      <Contact />
    </main>
  );
}
