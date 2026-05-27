const STEPS = [
  {
    num: "I",
    title: "The séance",
    body: "A one-hour call. No recording, no notes shared. You describe the work, the deadline, and the panic level. We listen.",
    aside: "Free · NDA optional",
  },
  {
    num: "II",
    title: "The sigil",
    body: "If we are the right familiars, we send a sigil — a one-page engagement letter naming scope, price, dates, and the cover identity we will work under.",
    aside: "Within 48 hours",
  },
  {
    num: "III",
    title: "The passage",
    body: "We work. You see weekly passages — milestones delivered into your repo, your Notion, or your Drive. On the final passage, we hand back the keys and disappear.",
    aside: "Weekly drops",
  },
];

export default function Engagement() {
  return (
    <section className="dm-engagement" id="engagement" aria-labelledby="engagement-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— Engagement</div>
        <h2 id="engagement-heading" className="dm-section__title">
          The three-step <em>ritual.</em>
        </h2>
        <p className="dm-section__lede">
          We do not list rates because every job is a different size, in a
          different language, under a different deadline. We do list the steps,
          and they are always these.
        </p>
      </div>

      <ol className="dm-engagement__list" aria-label="Engagement process">
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
