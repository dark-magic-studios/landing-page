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
          <span>Independent software studio · est. mmxix</span>
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
          Apps, tools &amp; <span className="dm-text-plasma">software.</span>
        </h1>

        <p className="dm-hero__lede">
          We build developer tools, small fast apps, and the systems underneath
          games. Our own products first, plus a couple of client projects a year.
        </p>

        <div className="dm-hero__cta-row">
          <TrackedLink
            className="dm-btn dm-btn--primary"
            href="/products"
            eventName="nav_click"
            eventCategory="navigation"
            eventLabel="hero_products"
          >
            What we&apos;re building
          </TrackedLink>
          <TrackedLink
            className="dm-btn dm-btn--ghost"
            href="/services"
            eventName="nav_click"
            eventCategory="navigation"
            eventLabel="hero_services"
          >
            What we do →
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
