import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";

export default function Hero() {
  return (
    <header className="dm-hero" id="studio">
      <div className="dm-hero__veil" aria-hidden="true" />
      <div className="dm-hero__grain" aria-hidden="true" />

      <div className="dm-hero__inner">
        <div className="dm-hero__kicker">
          <span className="dm-hero__kicker-dot" aria-hidden="true" />
          <span>Independent Software &amp; Game Studio · est. mmxix</span>
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
          Apps, games &amp; <span className="dm-text-plasma">software.</span>
        </h1>

        <p className="dm-hero__lede">
          We architect and ship high-performance applications, interactive game
          systems, and open-source developer tooling. From multi-agent harnesses
          to custom rendering logic, Dark Magic Studios builds software that endures.
        </p>

        <div className="dm-hero__cta-row">
          <TrackedLink
            className="dm-btn dm-btn--primary"
            href="#products"
            eventName="nav_click"
            eventCategory="navigation"
            eventLabel="hero_explore_products"
          >
            Explore products
          </TrackedLink>
          <TrackedLink
            className="dm-btn dm-btn--ghost"
            href="#software"
            eventName="nav_click"
            eventCategory="navigation"
            eventLabel="hero_our_software"
          >
            Our software →
          </TrackedLink>
        </div>

        <div className="dm-hero__meta" aria-label="Studio statistics">
          <div>
            <div className="dm-hero__meta-num">13</div>
            <div className="dm-hero__meta-lbl">AI Agent personas</div>
          </div>
          <div className="dm-hero__meta-sep" aria-hidden="true" />
          <div>
            <div className="dm-hero__meta-num">3</div>
            <div className="dm-hero__meta-lbl">Software domains</div>
          </div>
          <div className="dm-hero__meta-sep" aria-hidden="true" />
          <div>
            <div className="dm-hero__meta-num">100%</div>
            <div className="dm-hero__meta-lbl">Independent &amp; Open</div>
          </div>
        </div>
      </div>
    </header>
  );
}

