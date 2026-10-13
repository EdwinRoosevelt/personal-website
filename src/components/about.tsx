import Image from "next/image";
import me from "@/assets/me.jpg";
import { Sheet } from "@/components/sheet";

const interests = [
  "Programming",
  "Photography",
  "Photoshop",
  "Guitar",
  "Music",
  "Reading",
  "Science",
  "DIY builds",
  "Riding",
  "Athletics",
  "Adventure",
];

const quotes = [
  { text: "You are the result of 4 billion years of evolutionary success. Act like it.", by: "Unknown" },
  { text: "Danger is real, but fear is a choice.", by: "Will Smith, After Earth" },
  { text: "One day you'll leave this world behind, so live a life you will remember.", by: "Avicii" },
  { text: "Education is not the learning of facts, but the training of the mind to think.", by: "Albert Einstein" },
  { text: "Every next level of your life will demand a different you.", by: "Leonardo DiCaprio" },
];

export function About() {
  return (
    <Sheet id="about">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
        <div className="max-w-2xl space-y-5 text-lg text-pretty">
          <p className="text-2xl leading-snug">
            Mechanical engineer by degree, software developer by trade, and curious about nearly
            everything.
          </p>
          <p>
            Since 2021 I&rsquo;ve worked across the stack: as an SRE on SonyLIV&rsquo;s streaming
            platform, building web apps at Bibox Labs, and full-stack at Beanstalk in Kolkata,
            where I&rsquo;m now a senior developer.
            I work in JavaScript, TypeScript, Python and Java, and I&rsquo;m the person on the team
            who can explain a technical problem to someone who isn&rsquo;t technical.
          </p>
          <p>
            Pour a coffee and we can talk about anything: the quantum world, the far edges of the
            universe, where AI and quantum computing are heading, even the meaning of life. What we
            know is a drop of water in a vast and unknown ocean.
          </p>

          <div className="pt-8">
            <h3 className="annot mb-3 !text-ink">Interests</h3>
            <ul className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <li key={i} className="border border-ink/30 px-2.5 py-1 font-mono text-xs">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="self-start md:sticky md:top-12">
          <div className="relative border border-ink p-2">
            <Image
              src={me}
              alt="Portrait of Edwin Roosevelt"
              placeholder="blur"
              sizes="(min-width: 768px) 17rem, 100vw"
              className="w-full grayscale-[35%]"
            />
          </div>
          <figcaption className="annot mt-2 flex justify-between">
            <span>Fig. 1</span>
            <span>The author</span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-20">
        <h3 className="annot mb-6 !text-ink">Pinned above the desk</h3>
        <ul className="grid border-t border-l border-ink/20 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q) => (
            <li key={q.text} className="border-r border-b border-ink/20 p-6">
              <blockquote>
                <p className="text-lg leading-snug">&ldquo;{q.text}&rdquo;</p>
                <footer className="annot mt-4">{q.by}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
}
