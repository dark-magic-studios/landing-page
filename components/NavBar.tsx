"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/gtag";

const navLinks = [
  { id: "services", href: "/services", label: "Services" },
  { id: "products", href: "/products", label: "Products" },
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
          <Link
            key={l.id}
            href={l.href}
            className="dm-nav__link"
            onClick={() => trackEvent("nav_click", { category: "navigation", label: l.id })}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        className="dm-btn dm-btn--ghost-outline"
        href="mailto:hello@darkmagicstudios.com"
        onClick={() => trackEvent("email_click", { category: "contact", label: "navbar" })}
      >
        Get in touch
      </Link>
    </nav>
  );
}

