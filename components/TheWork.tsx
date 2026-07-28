"use client";

import { useState } from "react";

const ROWS = [
  {
    year: "2025",
    role: "Open-source CLI & TUI harness",
    tag: "Hocus Multi-Agent Compiler",
    sigil: "HOCUS · CLI DECK",
    detail:
      "A unified persona compiler and interactive TUI deck for AI coding agents. Compiles single SOUL.md specs into target formats for Claude Code, OpenCode, Cursor, and Antigravity. Features interactive chat, battle plan trackers, and repo stack scrying.",
  },
  {
    year: "2024",
    role: "Game engine & graphics pipeline",
    tag: "Stealth pixel-art roguelike",
    sigil: "PIXEL ENGINE · 2D",
    detail:
      "Engineered a 14,000-tile sprite pipeline, high-framerate biome renderer, and custom boss arena shaders. Built to maintain 60 FPS under heavy particle and projectile loads. Reached #2 Steam wishlist slot during launch week.",
  },
  {
    year: "2024",
    role: "Binary persistence & state sync",
    tag: "Cozy life-sim save system",
    sigil: "BINARY PROTOCOL",
    detail:
      "Architected a versioned binary save-file format with zero-alloc deserialization to replace disk-bound JSON logs. Enabled instant seamless save/load cycles and cross-platform save integrity across Nintendo Switch, PS5, and PC.",
  },
  {
    year: "2025",
    role: "Real-time multiplayer seed engine",
    tag: "Multiplayer card game core",
    sigil: "STATE RECONCILER",
    detail:
      "Engineered a deterministic seed generator, state reconciler, and tie-break rule system for competitive PvP card play. Eliminated desyncs and achieved sub-millisecond seed verification across client-server boundaries.",
  },
];

export default function TheWork() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="dm-work" id="work" aria-labelledby="work-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— Selected software</div>
        <h2 id="work-heading" className="dm-section__title">
          Built &amp; <em>engineered.</em>
        </h2>
        <p className="dm-section__lede">
          From open-source developer tooling to high-performance game logic, explore
          the software systems and platforms architected by Dark Magic Studios.
        </p>
      </div>

      <ul className="dm-work__list" aria-label="Selected software projects">
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
                <span className="dm-work__sigil">{r.sigil}</span>
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

