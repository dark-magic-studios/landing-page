const STEPS = [
  {
    num: "I",
    title: "Scope & shape",
    body: "Work out what is actually being built and what it has to do before any code is written. Data model, boundaries, and the parts most likely to go wrong — on paper, where changing your mind is cheap.",
    aside: "Phase I · Blueprint",
  },
  {
    num: "II",
    title: "Build in the open",
    body: "Small commits, working software early, and a repo you can look at whenever you want. Nothing disappears into a black box for six weeks and comes back as a surprise.",
    aside: "Phase II · Build",
  },
  {
    num: "III",
    title: "Ship & hand over",
    body: "Released with documentation, tests where they earn their keep, and enough written down that someone else could pick it up. Then we stay reachable — things break, and we answer email.",
    aside: "Phase III · Ship",
  },
];

export default function Engagement() {
  return (
    <section className="dm-engagement" id="engagement" aria-labelledby="engagement-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— How we work</div>
        <h2 id="engagement-heading" className="dm-section__title">
          Three phases, <em>no surprises.</em>
        </h2>
        <p className="dm-section__lede">
          The same shape whether it is one of our products or your project. It is not
          complicated, and that is rather the point.
        </p>
      </div>

      <ol className="dm-engagement__list" aria-label="How we work">
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
