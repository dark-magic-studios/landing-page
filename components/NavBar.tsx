"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#studio", label: "The studio" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "The work" },
  { href: "/the-veil", label: "The veil" },
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
      <Link className="dm-nav__brand" href="/">
        <Image
          src="/mark.png"
          alt=""
          width={32}
          height={32}
          className="dm-nav__mark"
          priority
        />
        <span className="dm-nav__wordmark">Dark Magic Studios</span>
      </Link>

      <div className="dm-nav__links">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="dm-nav__link">
            {l.label}
          </Link>
        ))}
      </div>

      <Link className="dm-btn dm-btn--ghost-outline" href="/#contact">
        Request a séance
      </Link>
    </nav>
  );
}
