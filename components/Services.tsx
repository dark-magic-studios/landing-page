import { Feather, KeyRound, Scroll } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SERVICES: {
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  rule: string;
}[] = [
  {
    Icon: Feather,
    eyebrow: "Service · I",
    title: "Art rescue",
    body: "Your concept artist vanished. The Kickstarter is in nine weeks. We pick up the brushes, match the file, and leave no fingerprints. Splash art, character lineups, environment matte, marketing key art, store icons.",
    rule: "We ghost the look. Your art lead approves every frame.",
  },
  {
    Icon: KeyRound,
    eyebrow: "Service · II",
    title: "Code rescue",
    body: "The build is on fire. We sit inside your repo as a contractor of record under another name, patch the bleeding systems, write the docs your last engineer didn't, and hand back a project that compiles in silence.",
    rule: "Unity, Godot, Unreal, custom C++. No Web3, no NFT mints.",
  },
  {
    Icon: Scroll,
    eyebrow: "Service · III",
    title: "Narrative rescue",
    body: "Your script is two acts of brilliance and a third act of panic. We write into your tone, your barks, your codex, your readme. Quest text, dialogue passes, lore bibles, store copy, post-launch patch notes.",
    rule: "You hold the byline. We hold the red pen.",
  },
];

export default function Services() {
  return (
    <section className="dm-services" id="services" aria-labelledby="services-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— The work, briefly</div>
        <h2 id="services-heading" className="dm-section__title">
          Three kinds of <em>rescue</em>.
        </h2>
        <p className="dm-section__lede">
          We do not do strategy decks. We do not do brand workshops. We come in
          late, work fast, leave clean.
        </p>
      </div>

      <div className="dm-services__grid">
        {SERVICES.map((s) => (
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
