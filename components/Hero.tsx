export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 py-32 text-center md:py-48"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.15) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)",
      }}
      aria-label="Hero"
    >
      <h1
        className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text)" }}
      >
        We build software that works.
      </h1>

      <p
        className="mb-10 max-w-xl text-base leading-relaxed md:text-lg"
        style={{ color: "var(--color-muted)" }}
      >
        Dark Magic Studios is an independent studio focused on tools, games, and
        developer products. We ship things that are useful, well-made, and built
        to last.
      </p>

      {/* Ghost CTA button with gradient border */}
      <a
        href="#work"
        className="relative inline-flex items-center justify-center rounded-md px-7 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-90"
        style={{
          background: "transparent",
          color: "var(--color-purple-light)",
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(var(--color-bg), var(--color-bg)), linear-gradient(to right, var(--color-purple), var(--color-blue))",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          fontFamily: "var(--font-inter)",
          letterSpacing: "0.05em",
        }}
        aria-label="See Our Work — scroll to projects section"
      >
        See Our Work
      </a>
    </section>
  );
}
