"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { id: "studio",   label: "The studio" },
  { id: "services", label: "Services" },
  { id: "work",     label: "The work" },
  { id: "veil",     label: "The veil" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`dm-nav${scrolled ? " is-scrolled" : ""}`} aria-label="Main navigation">
      <a className="dm-nav__brand" href="#top">
        <Image
          src="/mark.png"
          alt=""
          width={32}
          height={32}
          className="dm-nav__mark"
          priority
        />
        <span className="dm-nav__wordmark">Dark Magic Studios</span>
      </a>

      <div className="dm-nav__links">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="dm-nav__link">
            {l.label}
          </a>
        ))}
      </div>

      <a className="dm-btn dm-btn--ghost-outline" href="#contact">
        Request a séance
      </a>
    </nav>
  );
}
