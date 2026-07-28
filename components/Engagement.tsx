const STEPS = [
  {
    num: "I",
    title: "Architecture & Spec",
    body: "Defining modular schemas, agent personas, and strict protocol contracts before writing code. We establish test plans and runtime boundaries early.",
    aside: "Phase I · Blueprint",
  },
  {
    num: "II",
    title: "Engineering & Performance",
    body: "Building low-latency applications, game engines, and developer tools with zero-alloc data structures and deterministic state management.",
    aside: "Phase II · Build",
  },
  {
    num: "III",
    title: "Release & Open Source",
    body: "Shipping documented binaries, open-source packages, and standalone software into production with comprehensive documentation and unit testing.",
    aside: "Phase III · Ship",
  },
];

export default function Engagement() {
  return (
    <section className="dm-engagement" id="engagement" aria-labelledby="engagement-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— Engineering lifecycle</div>
        <h2 id="engagement-heading" className="dm-section__title">
          How we <em>build &amp; ship.</em>
        </h2>
        <p className="dm-section__lede">
          Every app, game, and software system created at Dark Magic Studios follows a
          rigorous, disciplined development lifecycle from initial architecture to final release.
        </p>
      </div>

      <ol className="dm-engagement__list" aria-label="Development process">
        {STEPS.map((s) => (
          <li key={s.num} className="dm-engagement__step">
            <div className="dm-engagement__num" aria-label={`Step ${s.num}`}>{s.num}</div>
            <div>
              <h3 className="dm-engagement__title">{s.title}</h3>
              <p className="dm-engagement__copy">{s.body}</p>
              <div className="dm-engagement__aside">{s.aside}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

