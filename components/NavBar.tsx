"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { id: "studio", href: "/#studio", label: "The studio" },
  { id: "services", href: "/#services", label: "Services" },
  { id: "work", href: "/#work", label: "The work" },
  { id: "veil", href: "/the-veil", label: "The veil" },
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
        {navLinks.map((l) => (
          <Link key={l.id} href={l.href} className="dm-nav__link">
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
