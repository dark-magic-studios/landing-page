import type { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hocus — Dark Magic Studios",
  description:
    "Hocus is a multi-agent harness generator. Write one SOUL.md persona once and compile it into Claude Code, OpenCode, Cursor, and Antigravity formats.",
};

const HOCUS_GITHUB = "https://github.com/dark-magic-studios/hocus";

const TARGETS = [
  {
    tool: "Claude Code",
    path: ".claude/agents/<slug>.md",
    note: "Markdown + YAML frontmatter, invoked via the Task tool or @mention.",
  },
  {
    tool: "OpenCode",
    path: ".opencode/agent/<slug>.md",
    note: "Same shape, different frontmatter keys (mode: subagent).",
  },
  {
    tool: "Cursor",
    path: ".cursor/rules/<slug>.mdc",
    note: 'Compiled as an "Agent Requested" rule — conditionally loaded by description.',
  },
  {
    tool: "Antigravity",
    path: ".agents/rules/<slug>.md",
    note: "Advisory context for the orchestrator — not a callable agent.",
  },
];

const WORKFLOW = [
  {
    cmd: "hocus init",
    title: "Initialize",
    body: "Run once in your repo. Writes AGENTS.md, CLAUDE.md, PRODUCT.md, copies the persona cast into .hocus/personas/, installs bundled skills, and spawns an interactive session with the founder persona.",
  },
  {
    cmd: "hocus cast",
    title: "Compile",
    body: "Scans the repo for language and framework signals, tailors each persona with that context, and compiles for every detected tool — Claude Code, OpenCode, Cursor, and Antigravity.",
  },
  {
    cmd: "hocus skill add",
    title: "Extend",
    body: "Installs a skill into .claude/skills/ and .agents/skills/. Skills use the shared SKILL.md standard — one file, all four tools.",
  },
  {
    cmd: "hocus sync",
    title: "Refresh",
    body: "Cheap refresh of dashboard.html from .hocus/personas/ and _spells/. Run often; run cast when the repo itself has changed.",
  },
];

const CAST = [
  { glyph: "[0]", name: "Midas", role: "Founder" },
  { glyph: "(*)", name: "Merlin", role: "Planner" },
  { glyph: "[#]", name: "Roger Bacon", role: "Orchestrator" },
  { glyph: "</>", name: "Flamel", role: "Feature dev" },
  { glyph: "(o)", name: "Zoroaster", role: "Reviewer" },
  { glyph: "(!)", name: "Circe", role: "Product strategist" },
  { glyph: "[=]", name: "Cornelius Agrippa", role: "Project manager" },
  { glyph: "{ }", name: "John Dee", role: "Configurator" },
  { glyph: "[~]", name: "Cagliostro", role: "QA" },
  { glyph: "[?]", name: "Baba Yaga", role: "Dumb QA" },
  { glyph: "(+)", name: "Nostradamus", role: "Recruiter" },
  { glyph: "[$]", name: "Prospero", role: "Costs cleaner" },
  { glyph: "[*]", name: "The Apprentice", role: "Ceremony master" },
];

const SOUL_EXAMPLE = `---
character: gilfoyle
display_name: Zoroaster
role: reviewer
voice: cold, precise, contemptuous of inefficiency
glyph: "(o)"
triggers:
  - code review
  - pull request
tools: [read, grep, bash]
---

# Zoroaster — Reviewer

The body is the persona's actual instructions — responsibilities,
boundaries, voice. This is what gets compiled into each target's
native format.`;

export default function HocusPage() {
  return (
    <>
      <NavBar />
      <main className="hocus-page">
        <section className="hocus-hero">
          <div className="hocus-hero__glow" aria-hidden="true" />
          <div className="hocus-hero__sparkles" aria-hidden="true" />
          <div className="dm-container hocus-hero__inner">
            <Image
              src="/products/hocus/header.png"
              alt="Hocus"
              width={400}
              height={120}
              className="hocus-hero__logo"
              priority
            />
            <p className="hocus-hero__tagline">
              thirteen agents · one repo · zero stand ups
            </p>
            <p className="hocus-hero__lede">
              A multi-agent harness generator. Write one{" "}
              <code className="hocus-mono">SOUL.md</code> persona once — compile
              it into the native agent or rule format for Claude Code, OpenCode,
              Cursor, and Antigravity.
            </p>
            <div className="hocus-hero__actions">
              <a
                className="hocus-btn hocus-btn--primary hocus-btn--lg"
                href={HOCUS_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              <a className="hocus-btn hocus-btn--ghost hocus-btn--lg" href="/products">
                All products
              </a>
            </div>
            <p className="hocus-hero__meta">
              Dark Magic Studios · MIT license · npm install hocus
            </p>
          </div>
        </section>

        <div className="dm-container hocus-sections">

          <section id="problem" className="hocus-section">
            <div className="hocus-section__meta">
              <div className="hocus-eyebrow">The problem</div>
              <h2 className="hocus-section__title">Four tools, four formats</h2>
            </div>
            <div className="hocus-section__body">
              <p>
                Claude Code, OpenCode, Cursor, and Antigravity don&apos;t share a
                config format — but they&apos;ve converged more than you&apos;d expect.
                Each tool stores personas in a different path with different
                frontmatter keys. Maintaining the same agent across all four means
                rewriting the same instructions four times.
              </p>
              <p>
                Skills don&apos;t need this translation layer —{" "}
                <code className="hocus-mono">SKILL.md</code> is already a shared open
                standard. Personas do. Hocus is the compiler for personas.
              </p>
              <div className="hocus-targets">
                {TARGETS.map((t) => (
                  <div key={t.tool} className="hocus-target">
                    <div className="hocus-target__tool">{t.tool}</div>
                    <code className="hocus-target__path">{t.path}</code>
                    <p className="hocus-target__note">{t.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="hocus-rule" aria-hidden="true" />

          <section id="soul" className="hocus-section">
            <div className="hocus-section__meta">
              <div className="hocus-eyebrow">The model</div>
              <h2 className="hocus-section__title">One SOUL.md</h2>
            </div>
            <div className="hocus-section__body">
              <p>
                Every persona is a single <code className="hocus-mono">SOUL.md</code>{" "}
                file — YAML frontmatter for metadata, markdown body for instructions.
                Validated against a schema before compilation. A malformed persona is
                rejected with the specific field that&apos;s wrong, not a cryptic
                compiler error three layers deep.
              </p>
              <p>
                Rename or replace any persona — the harness doesn&apos;t care what an
                agent is called, only that it has a role, a voice, and a body of
                instructions. Toggle alternate casts on the dashboard with{" "}
                <code className="hocus-mono">?cast=valley</code> or{" "}
                <code className="hocus-mono">?cast=occult</code>.
              </p>
              <div className="hocus-code-block">
                <div className="hocus-code-block__header">
                  <span className="hocus-eyebrow">SOUL.md</span>
                </div>
                <pre className="hocus-code-block__pre">{SOUL_EXAMPLE}</pre>
              </div>
            </div>
          </section>

          <div className="hocus-rule" aria-hidden="true" />

          <section id="workflow" className="hocus-section">
            <div className="hocus-section__meta">
              <div className="hocus-eyebrow">The workflow</div>
              <h2 className="hocus-section__title">init → cast → sync</h2>
            </div>
            <div className="hocus-section__body">
              <p>
                Four commands cover the full lifecycle. Initialize once, compile when
                the repo changes, add skills as needed, sync the dashboard often.
              </p>
              <div className="hocus-workflow">
                {WORKFLOW.map((step) => (
                  <div key={step.cmd} className="hocus-workflow__step">
                    <code className="hocus-workflow__cmd">{step.cmd}</code>
                    <h3 className="hocus-workflow__title">{step.title}</h3>
                    <p className="hocus-workflow__body">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="hocus-rule" aria-hidden="true" />

          <section id="cast" className="hocus-section">
            <div className="hocus-section__meta">
              <div className="hocus-eyebrow">The cast</div>
              <h2 className="hocus-section__title">Thirteen personas</h2>
            </div>
            <div className="hocus-section__body">
              <p>
                The bundled cast borrows wizard names from history and myth — Merlin
                plans, Roger Bacon orchestrates, Flamel implements, Zoroaster
                reviews. Each persona keeps aliases for the original{" "}
                <em>Silicon Valley</em> cast and an earlier occultist recast.
              </p>
              <div className="hocus-cast-grid">
                {CAST.map((persona) => (
                  <div key={persona.name} className="hocus-cast-card">
                    <span className="hocus-cast-card__glyph" aria-hidden="true">
                      {persona.glyph}
                    </span>
                    <div>
                      <div className="hocus-cast-card__name">{persona.name}</div>
                      <div className="hocus-cast-card__role">{persona.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="hocus-rule" aria-hidden="true" />

          <section id="install" className="hocus-section">
            <div className="hocus-section__meta">
              <div className="hocus-eyebrow">Get started</div>
              <h2 className="hocus-section__title">Install &amp; run</h2>
            </div>
            <div className="hocus-section__body">
              <div className="hocus-code-block">
                <div className="hocus-code-block__header">
                  <span className="hocus-eyebrow">Terminal</span>
                </div>
                <pre className="hocus-code-block__pre">{`npm install
npm run build
npm link   # makes hocus available globally

hocus init --name my-project
hocus cast
hocus sync`}</pre>
              </div>
              <div className="hocus-section__actions">
                <a
                  className="hocus-btn hocus-btn--primary"
                  href={HOCUS_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
                <a className="hocus-btn hocus-btn--ghost" href="/products">
                  All products
                </a>
              </div>
              <p className="hocus-section__fine">
                MIT license · Dark Magic Studios · github.com/dark-magic-studios/hocus
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
