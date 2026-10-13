import { Section } from "@/components/section";

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
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-24">
        <div className="space-y-5 text-lg text-pretty">
          <p className="text-2xl leading-snug font-semibold sm:text-3xl">
            Mechanical engineer by degree, software developer by trade, and curious about nearly
            everything.
          </p>
          <p>
            Since 2021 I&rsquo;ve worked across the stack: as an SRE on SonyLIV&rsquo;s streaming
            platform, building web apps at Bibox Labs, and full-stack at Beanstalk in Kolkata,
            where I&rsquo;m now a senior developer. I work in JavaScript, TypeScript, Python and
            Java, and I&rsquo;m the person on the team who can explain a technical problem to
            someone who isn&rsquo;t technical.
          </p>
          <p>
            Pour a coffee and we can talk about anything: the quantum world, the far edges of the
            universe, where AI and quantum computing are heading, even the meaning of life. What we
            know is a drop of water in a vast and unknown ocean.
          </p>
        </div>

        <div>
          <h3 className="annot mb-4">Into</h3>
          <ul className="flex flex-wrap gap-2">
            {interests.map((i) => (
              <li key={i} className="rounded-full border-2 border-ink px-3.5 py-1 text-sm font-medium">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20 rounded-[2rem] bg-blue px-6 py-10 text-paper sm:px-10 sm:py-14">
        <h3 className="annot mb-8 !text-paper/80">Pinned above the desk</h3>
        <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q) => (
            <li key={q.text}>
              <blockquote>
                <p className="text-xl leading-snug font-semibold">&ldquo;{q.text}&rdquo;</p>
                <footer className="annot mt-3 !text-paper/80">{q.by}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
