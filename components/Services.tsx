import { Terminal, Gamepad2, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DOMAINS: {
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  rule: string;
}[] = [
  {
    Icon: Terminal,
    eyebrow: "Pillar · I",
    title: "Developer tools & harnesses",
    body: "Multi-agent harness generators, CLI command decks, and developer tooling. We build tools like Hocus that compile declarative agent personas across Claude Code, OpenCode, Cursor, and Antigravity.",
    rule: "Open-source developer instruments built for modern agentic workflows.",
  },
  {
    Icon: Gamepad2,
    eyebrow: "Pillar · II",
    title: "Interactive games & engines",
    body: "Custom game engines, high-framerate sprite renderers, and deterministic physics logic. From pixel-art roguelikes to complex simulation logic in Unity, Godot, Unreal, and C++.",
    rule: "Low-latency game architecture designed for feel and precision.",
  },
  {
    Icon: Cpu,
    eyebrow: "Pillar · III",
    title: "Software apps & protocols",
    body: "High-performance desktop applications, binary serialization protocols, and reactive web applications. We focus on zero-bloat architecture, low memory footprints, and fast execution.",
    rule: "Clean codebases built to scale without unnecessary dependencies.",
  },
];

export default function Services() {
  return (
    <section className="dm-services" id="software" aria-labelledby="software-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— Core focus</div>
        <h2 id="software-heading" className="dm-section__title">
          Three pillars of <em>software.</em>
        </h2>
        <p className="dm-section__lede">
          We do not build generic landing pages or fluff. We engineer tools, games,
          and software platforms built for performance and durability.
        </p>
      </div>

      <div className="dm-services__grid">
        {DOMAINS.map((s) => (
          <article key={s.title} className="dm-service-card">
            <s.Icon className="dm-service-card__glyph" aria-hidden="true" />
            <div className="dm-service-card__eyebrow">{s.eyebrow}</div>
            <h3 className="dm-service-card__title">{s.title}</h3>
            <p className="dm-service-card__body">{s.body}</p>
            <div className="dm-service-card__rule">{s.rule}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

