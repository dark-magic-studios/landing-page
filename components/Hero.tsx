import Image from "next/image";

export default function Hero() {
  return (
    <header className="dm-hero" id="studio">
      <div className="dm-hero__veil" aria-hidden="true" />
      <div className="dm-hero__grain" aria-hidden="true" />

      <div className="dm-hero__inner">
        <div className="dm-hero__kicker">
          <span className="dm-hero__kicker-dot" aria-hidden="true" />
          <span>By appointment only · est. mmxix</span>
        </div>

        <Image
          src="/mark.png"
          alt=""
          width={240}
          height={240}
          className="dm-hero__mark"
          priority
        />

        <h1 className="dm-hero__title">
          The ghost <span className="dm-text-plasma">studio.</span>
        </h1>

        <p className="dm-hero__lede">
          We finish what you started. Your trailer ships with your studio&rsquo;s
          name on it; the people who painted, animated, scored, and patched it
          remain off-credits. That is the entire arrangement.
        </p>

        <div className="dm-hero__cta-row">
          <a className="dm-btn dm-btn--primary" href="#contact">
            Request a séance
          </a>
          <a className="dm-btn dm-btn--ghost" href="#services">
            What we do →
          </a>
        </div>

        <div className="dm-hero__meta" aria-label="Studio statistics">
          <div>
            <div className="dm-hero__meta-num">217</div>
            <div className="dm-hero__meta-lbl">Passages delivered</div>
          </div>
          <div className="dm-hero__meta-sep" aria-hidden="true" />
          <div>
            <div className="dm-hero__meta-num">0</div>
            <div className="dm-hero__meta-lbl">Credits taken</div>
          </div>
          <div className="dm-hero__meta-sep" aria-hidden="true" />
          <div>
            <div className="dm-hero__meta-num">48h</div>
            <div className="dm-hero__meta-lbl">Reply, by sigil</div>
          </div>
        </div>
      </div>
    </header>
  );
}
