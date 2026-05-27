"use client";

import { useState } from "react";

const ROWS = [
  {
    year: "2024",
    role: "Art lead, six weeks",
    tag: "Stealth pixel-art roguelike",
    sigil: "███ ███ ████████",
    detail:
      "Inherited a 14,000-tile palette and a deadline. Rebuilt the spritesheet for the late-game biomes, repainted three boss arenas, and re-cut the trailer over a long weekend. Steam page took the #2 wishlist slot on launch week. Studio name remains theirs.",
  },
  {
    year: "2024",
    role: "Senior engineer, three months",
    tag: "Cozy life-sim, AA-funded",
    sigil: "█████████ ███",
    detail:
      "Save-system rewrite from scratch under a colour-of-money veil. Replaced a JSON-on-disk dumpster with a versioned binary format and a migration path. Shipped on Switch, PS5, and PC simultaneously. Their engineer's name is on the credits.",
  },
  {
    year: "2025",
    role: "Narrative editor, two acts",
    tag: "Story-driven horror, solo dev",
    sigil: "███ █████ ██████",
    detail:
      "A solo developer brought us a 142,000-word manuscript and a creeping suspicion the second act was broken. We did three passes. We did not rewrite. The book reads like one author, and that author is them.",
  },
  {
    year: "2025",
    role: "Code rescue, two weeks",
    tag: "Multiplayer card game",
    sigil: "██████ ██ ████",
    detail:
      "Server desync was eating PvP games. We did not fix the network code. We did fix the seed generator, the tie-break rule, and the analytics that had been lying to them for six months. Their lead engineer wrote the blog post.",
  },
];

export default function TheWork() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="dm-work" id="work" aria-labelledby="work-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— Selected work</div>
        <h2 id="work-heading" className="dm-section__title">
          Behind <em>the veil.</em>
        </h2>
        <p className="dm-section__lede">
          Everything below is redacted. We will not confirm a project by name even
          to your peers. If you need a reference, we will arrange a call with a
          past client at their discretion, never at ours.
        </p>
      </div>

      <ul className="dm-work__list" aria-label="Selected work cases">
        {ROWS.map((r, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className={`dm-work__row${isOpen ? " is-open" : ""}`}>
              <button
                className="dm-work__head"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="dm-work__year">{r.year}</span>
                <span className="dm-work__sigil" aria-label="Redacted project name">{r.sigil}</span>
                <span className="dm-work__role">{r.role}</span>
                <span className="dm-work__tag">{r.tag}</span>
                <span className="dm-work__chev" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="dm-work__detail">{r.detail}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
