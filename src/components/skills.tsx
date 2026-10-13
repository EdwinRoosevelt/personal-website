import { parts } from "@/content/skills";
import { Sheet } from "@/components/sheet";

/** Skills laid out as a drawing's parts list, one column per group. */
export function Skills() {
  return (
    <Sheet id="skills" aside="What I build with, grouped by where it sits in the stack.">
      <div className="grid grid-cols-2 border-t border-l border-ink lg:grid-cols-4">
        {parts.map((p) => (
          <div key={p.group} className="border-r border-b border-ink">
            <h3 className="annot border-b border-ink bg-paper-2 px-3 py-2.5 !text-ink sm:px-4">{p.group}</h3>
            <ul>
              {p.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-ink/15 px-3 py-2 font-mono text-[0.8rem] last:border-b-0 sm:px-4 sm:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
