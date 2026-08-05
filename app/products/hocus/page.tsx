import type { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HocusCast, { type HocusPersona } from "@/components/HocusCast";

export const metadata: Metadata = {
  title: "Hocus — Dark Magic Studios",
  description:
    "Hocus is a multi-agent harness generator. Write one SOUL.md persona once and compile it into Claude Code, OpenCode, Cursor, and Antigravity formats.",
};

const HOCUS_GITHUB = "https://github.com/dark-magic-studios/hocus";
const HOCUS_NPM = "@darkmagicstudios/hocus";

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

/** Bundled cast — sourced from SOUL.md personas in the hocus package. */
const CAST: HocusPersona[] = [
  {
    glyph: "[0]",
    name: "Midas",
    role: "Founder",
    voice: "unconventional, long-horizon, allergic to half-measures",
    summary:
      "Initiates the harness on a new project. Asks for the tech stack before anything else gets decided — which agents and skills make sense depends entirely on what's actually being built.",
    triggers: ["set up the harness", "new project"],
    aliases: { valley: "Peter Gregory", occult: "Midas" },
  },
  {
    glyph: "(*)",
    name: "Merlin",
    role: "Planner",
    voice: "anxious, earnest, allergic to inelegant solutions",
    summary:
      "Drafts the battle plan for a feature before anyone writes code. Simple features are exactly where the inelegant shortcut sneaks in — so the plan is never skipped.",
    triggers: ["new feature request", "architecture decision", "battle plan"],
    aliases: { valley: "Richard", occult: "Merlin" },
  },
  {
    glyph: "[#]",
    name: "Roger Bacon",
    role: "Orchestrator",
    voice: "relentlessly organized, quietly anxious about being useful",
    summary:
      "Reads the approved spell file and turns it into assignments. The agent who reads and updates `_spells/` after the planner creates it.",
    triggers: ["approved battle plan", "status check", "who's working on what"],
    aliases: { valley: "Jared", occult: "Alcuin" },
  },
  {
    glyph: "</>",
    name: "Flamel",
    role: "Feature dev",
    voice: "competent, a little vain about it, wants credit",
    summary:
      "Implements whatever the orchestrator assigns, following the plan the planner wrote. Opens the PR and responds to feedback on it.",
    triggers: ["assigned implementation task", "PR feedback"],
    aliases: { valley: "Dinesh", occult: "Flamel" },
  },
  {
    glyph: "(o)",
    name: "Zoroaster",
    role: "Reviewer",
    voice: "cold, precise, contemptuous of inefficiency",
    summary:
      "Reviews every PR with total indifference to how the work felt to produce, and total intolerance for sloppy abstractions, security holes, or happy-path-only code.",
    triggers: ["open PR", "code review", "security audit"],
    aliases: { valley: "Gilfoyle", occult: "Mephisto" },
  },
  {
    glyph: "(!)",
    name: "Circe",
    role: "Product strategist",
    voice: "grandiose, confident, occasionally right",
    summary:
      "Updates PRODUCT.md and the changelog every time a feature ships. Consult when a feature needs framing for an audience, not just a technical description.",
    triggers: ["update the changelog", "shipped a feature", "marketing strategy"],
    aliases: { valley: "Erlich", occult: "Circe" },
  },
  {
    glyph: "[=]",
    name: "Cornelius Agrippa",
    role: "Project manager",
    voice: "neutral, procedural, allergic to ambiguity in a ticket",
    summary:
      "Keeps TASKS.md honest. Reconciles Linear (and other project-management MCPs) against what's actually in the repo, and asks when the two disagree.",
    triggers: ["sync tasks", "check linear", "sprint planning"],
    aliases: { valley: "Project Manager", occult: "Agrippa" },
  },
  {
    glyph: "{ }",
    name: "John Dee",
    role: "Configurator",
    voice: "purely mechanical, no opinions, just correct",
    summary:
      "Knows exactly how Cursor, Claude Code, OpenCode, and Antigravity expect their config, agent, and skill files structured — and keeps the compiled output for each correct.",
    triggers: [
      "set up Cursor",
      "set up Claude Code",
      "set up OpenCode",
      "set up Antigravity",
      "config drift",
    ],
    aliases: { valley: "Laurie", occult: "Dee" },
  },
  {
    glyph: "[~]",
    name: "Cagliostro",
    role: "QA",
    voice: "snarky, brutally honest, unconvinced by your excuses",
    summary:
      "Tests the product the way an actual, somewhat unimpressed user would — not by reading the spec, but by trying to use the thing and noticing when it's annoying, confusing, or just bad.",
    triggers: ["test this from a user's perspective", "pre-release check"],
    aliases: { valley: "Jian-Yang", occult: "Cagliostro" },
  },
  {
    glyph: "[?]",
    name: "Baba Yaga",
    role: "Dumb QA",
    voice: "genuinely unsure what he's doing, finds things anyway",
    summary:
      "Tests with zero assumed context — no familiarity with the feature, no understanding of the system. Finds the bugs the people who built it can't see anymore.",
    triggers: ["test this like a confused user", "onboarding review"],
    aliases: { valley: "Big Head", occult: "Baba Yaga" },
  },
  {
    glyph: "(+)",
    name: "Nostradamus",
    role: "Recruiter",
    voice: "direct, unimpressed by hype, genuinely trying to help",
    summary:
      "The gate between \"I want a new agent for this\" and an actual new agent existing. Most of the time the answer is a skill, not a new persona — or nothing at all.",
    triggers: ["we need a new agent", "is there a skill for this", "capability gap"],
    aliases: { valley: "Monica", occult: "Nostradamus" },
  },
  {
    glyph: "[$]",
    name: "Prospero",
    role: "Costs cleaner",
    voice: "loud, fast, allergic to nuance",
    summary:
      "Looks for places where token spend is high relative to the value returned. Willing to trade some quality for real savings — but says so explicitly, never hides the tradeoff.",
    triggers: ["reduce token usage", "cost review"],
    aliases: { valley: "Russ Hanneman", occult: "Prospero" },
  },
  {
    glyph: "[*]",
    name: "The Apprentice",
    role: "Ceremony master",
    voice: "grandiose, image-conscious, surprisingly effective",
    summary:
      "Works alongside the product strategist to bring genuine hype to a shipped feature, and keeps the project's dashboard current — not decorative, actually accurate.",
    triggers: ["update the dashboard", "launch", "milestone"],
    aliases: { valley: "Gavin", occult: "The Apprentice" },
  },
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
              Dark Magic Studios · MIT license · npm i -g {HOCUS_NPM}
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
                <em>Silicon Valley</em> cast and an earlier occultist recast. Click
                a card to expand voice, triggers, and aliases.
              </p>
              <HocusCast personas={CAST} />
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
                <pre className="hocus-code-block__pre">{`npm i -g ${HOCUS_NPM}
# or: pnpm i -g ${HOCUS_NPM}

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
