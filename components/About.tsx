import GradientRule from "./GradientRule";

const stack = [
  "TypeScript",
  "Rust",
  "Tauri",
  "Next.js",
  "React",
  "Node.js",
  "SQLite",
  "VS Code API",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl">
        <GradientRule />

        <h2
          id="about-heading"
          className="mt-10 mb-8 text-3xl font-bold md:text-4xl"
          style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text)" }}
        >
          About
        </h2>

        <div className="max-w-2xl space-y-5">
          <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Dark Magic Studios is a small independent software studio. We design and build desktop
            applications, developer tools, and games — products that are useful on their own terms,
            without needing a pitch deck to explain why.
          </p>

          <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Our work spans from simulation games to developer tooling. We favour native-feeling
            software, thoughtful interfaces, and stacks we understand well. No frameworks for the
            sake of it.
          </p>
        </div>

        {/* Stack pills */}
        <ul
          className="mt-8 flex flex-wrap gap-2 list-none"
          role="list"
          aria-label="Technologies we use"
        >
          {stack.map((tech) => (
            <li key={tech}>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wide"
                style={{
                  backgroundColor: "rgba(124,58,237,0.15)",
                  color: "var(--color-purple-light)",
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "0.05em",
                }}
              >
                {tech}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
