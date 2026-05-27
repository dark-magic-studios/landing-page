"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-sm"
      style={{ backgroundColor: "rgba(10, 11, 16, 0.8)", borderBottom: "1px solid var(--color-border)" }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Logo + Studio name */}
        <Link href="/" className="flex items-center gap-3" aria-label="Dark Magic Studios home">
          <Image
            src="/logo.png"
            alt="Dark Magic Studios logo"
            height={40}
            width={100}
            style={{ height: 40, width: "auto" }}
            priority
          />
          <span
            className="text-lg font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text)" }}
          >
            Dark Magic Studios
          </span>
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-8 list-none" role="list">
          {[
            { label: "Work", href: "#work" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{
                  color: "var(--color-muted)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
