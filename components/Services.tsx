import { Terminal, Gamepad2, AppWindow } from "lucide-react";
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
    title: "Developer tools & agent harnesses",
    body: "Command-line tools, TUIs, and the scaffolding that keeps AI coding agents useful past the first prompt. Hocus and Vitreus both came out of this — we build these for ourselves first, then ship the ones that survive daily use.",
    rule: "Built for the way people actually work with agents.",
  },
  {
    Icon: AppWindow,
    eyebrow: "Pillar · II",
    title: "Apps & web software",
    body: "Desktop and web applications that stay small: fast to open, cheap to run, and understandable a year later. We favour boring, well-understood stacks and client-side work over a server whenever the job allows it.",
    rule: "No framework we can't justify, no dependency we can't replace.",
  },
  {
    Icon: Gamepad2,
    eyebrow: "Pillar · III",
    title: "Games & game systems",
    body: "Simulation logic, save formats, and the systems underneath a game rather than the art on top of it. Deterministic state, sane data models, and tooling the designers can use without asking an engineer.",
    rule: "The unglamorous half of a game, done properly.",
  },
];

export default function Services({ id = "software" }: { id?: string }) {
  return (
    <section className="dm-services" id={id} aria-labelledby="software-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— Three areas</div>
        <h2 id="software-heading" className="dm-section__title">
          Three kinds of <em>work.</em>
        </h2>
        <p className="dm-section__lede">
          The same three areas whether it is our product or yours — because it is
          the work we are already good at.
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
