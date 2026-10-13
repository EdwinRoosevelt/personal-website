import Image from "next/image";
import me from "@/assets/me.jpg";
import { site } from "@/content/site";
import { Overprint } from "@/components/overprint";
import { RegistrationDrift } from "@/components/registration-drift";

const billing = [
  { text: "Senior developer at Beanstalk, Kolkata", href: "#career" },
  { text: "Mechanical engineer, Amrita ’19", href: "#about" },
  { text: "Photographer & poster designer", href: "#gallery" },
];

/**
 * The hero is a two-ink poster: the name overprinted in blue and pink across
 * a halftone portrait, with the billing underneath like a gig line-up.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="top-title" className="relative overflow-x-clip">
      <RegistrationDrift>
        <div className="mx-auto max-w-7xl px-5 pt-10 pb-20 sm:px-8 md:pt-14">
          <div className="flex items-center justify-between text-blue" aria-hidden>
            <span className="reg" />
            <span className="annot">Printed in two inks · {site.location}</span>
            <span className="reg" />
          </div>

          <div className="relative mt-10 md:mt-6">
            <figure className="halftone ml-auto aspect-[4/5] w-[62%] max-w-md rounded-[2rem] md:absolute md:top-0 md:right-0 md:aspect-square md:w-[29%]">
              <Image
                src={me}
                alt="Portrait of Edwin Roosevelt"
                placeholder="blur"
                priority
                sizes="(min-width: 768px) 24rem, 62vw"
                className="size-full object-cover"
              />
            </figure>

            <h1
              id="top-title"
              className="display relative -mt-16 text-[clamp(3.4rem,13.5vw,11.5rem)] md:mt-24"
            >
              <Overprint className="block">edwin</Overprint>
              <Overprint className="block">roosevelt</Overprint>
            </h1>
          </div>

          <ul
            className="mt-10 flex flex-col gap-2 border-y-2 border-ink py-4 md:mt-14 md:flex-row md:flex-wrap md:items-center md:gap-x-6"
            aria-label="At a glance"
          >
            {billing.map((b, i) => (
              <li key={b.href} className="flex items-center gap-6">
                {i > 0 && (
                  <span aria-hidden className="hidden text-2xl text-pink md:inline">
                    ✶
                  </span>
                )}
                <a href={b.href} className="text-lg font-semibold hover:text-pink-text hover:underline md:text-xl">
                  {b.text}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg text-pretty">
              I build web products end to end, from the React interface down to the Node service and
              the server it runs on. Before that I was an SRE, keeping SonyLIV&rsquo;s streaming
              platform healthy.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-solid">
                Get in touch
              </a>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn">
                Résumé ↗
              </a>
            </div>
          </div>
        </div>
      </RegistrationDrift>
    </section>
  );
}
