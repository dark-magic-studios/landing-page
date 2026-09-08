import type { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HocusCast, { type HocusPersona } from "@/components/HocusCast";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Hocus — Dark Magic Studios",
  description:
    "Hocus is a multi-agent harness generator and interactive command deck. Write one SOUL.md persona once and compile it into Claude Code, OpenCode, Codex, Cursor, Antigravity, Command Code, and GitHub Copilot formats.",
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
    tool: "Codex",
    path: ".codex/agents/<slug>.toml",
    note: "Native TOML custom-agent config; repository skills load from .agents/skills/.",
  },
  {
    tool: "Cursor",
    path: ".cursor/rules/<slug>.mdc",
    note: 'No native subagents — compiled as an "Agent Requested" rule, conditionally loaded by description.',
  },
  {
    tool: "Antigravity",
    path: ".agents/agents/<slug>/agent.md",
    note: "Native custom subagents, discovered by directory with subagent: true frontmatter.",
  },
  {
    tool: "Command Code",
    path: ".commandcode/agents/<slug>.md",
    note: "Markdown + YAML frontmatter; every agent gets Taste compatibility instructions baked in.",
  },
  {
    tool: "GitHub Copilot",
    path: ".github/agents/<slug>.agent.md",
    note: "Compiled when .github/ is present or --copilot is passed; skills mirror to .github/skills/.",
  },
];

const WORKFLOW = [
  {
    cmd: "hocus init",
    title: "Initialize",
    body: "Run once in your repo. Writes AGENTS.md, CLAUDE.md, PRODUCT.md, MEMORY.md, TASKS.md and _spells/, copies the persona cast into .hocus/personas/, installs bundled skills, asks Silicon Valley or Wizards, and spawns an interactive session with the founder persona.",
  },
  {
    cmd: "hocus cast",
    title: "Compile",
    body: "Scans the repo for language and framework signals, tailors each persona with that context, and compiles native formats for every detected target — Claude Code, OpenCode, Codex, Cursor, Antigravity, Command Code, and GitHub Copilot.",
  },
  {
    cmd: "hocus add",
    title: "Extend",
    body: "Adds a persona or a skill to selected providers, locally or globally — hocus skill add <name> is the shorthand for a skill. Skills use the shared SKILL.md standard: one file, every tool.",
  },
  {
    cmd: "hocus sync",
    title: "Refresh",
    body: "Cheap rebuild of dashboard.html from .hocus/personas/ and _spells/ without recompiling agent files. Run often; run cast when the repo itself has changed.",
  },
];

/** Interactive command deck — the six tabs of `hocus tui`. */
const DECK_TABS = [
  {
    key: "1",
    name: "Séance",
    body: "Agent chat deck. Tab cycles personas, Ctrl+B cycles backends (Claude, Codex, Antigravity, custom), / triggers command and skill autocomplete, @ mentions repo files.",
  },
  {
    key: "2",
    name: "Spells",
    body: "In-flight feature specs, architectural blueprints, and step-by-step battle plans tracked in _spells/.",
  },
  {
    key: "3",
    name: "Souls",
    body: "Persona inspector — browse installed SOUL.md files, inspect metadata, voice, triggers, and schema validation.",
  },
  {
    key: "4",
    name: "Coven",
    body: "Agent topology — parent/child hierarchy, delegation structure, and orchestrator relationships.",
  },
  {
    key: "5",
    name: "Grimoire",
    body: "Skill management across .agents/skills/ and .claude/skills/.",
  },
  {
    key: "6",
    name: "Scrying",
    body: "Repository stack scanner detecting languages and frameworks, paired with live compilation status for every target tool.",
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
character: gilfoyle        # stable slug — survives a cast switch
display_name: Zoroaster
role: reviewer
voice: cold, precise, contemptuous of inefficiency
glyph: "(o)"
aliases:
  valley: Gilfoyle
  occult: Mephisto
triggers:
  - code review
  - pull request
tools: [read, grep, bash]
model: claude-sonnet-4-6
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
              A multi-agent harness generator and interactive command deck. Write
              one <code className="hocus-mono">SOUL.md</code> persona once — compile
              it into the native agent format for Claude Code, OpenCode, Codex,
              Cursor, Antigravity, Command Code, and GitHub Copilot.
            </p>
            <div className="hocus-hero__actions">
              <TrackedLink
                className="hocus-btn hocus-btn--primary hocus-btn--lg"
                href={HOCUS_GITHUB}
                external
                target="_blank"
                rel="noopener noreferrer"
                eventName="tool_link_click"
                eventCategory="tool_engagement"
                eventLabel="hocus_hero_github"
              >
                View on GitHub
              </TrackedLink>
              <TrackedLink
                className="hocus-btn hocus-btn--ghost hocus-btn--lg"
                href="/products"
                eventName="nav_click"
                eventCategory="navigation"
                eventLabel="hocus_hero_all_products"
              >
                All products
              </TrackedLink>
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
              <h2 className="hocus-section__title">Seven targets, seven formats</h2>
            </div>
            <div className="hocus-section__body">
              <p>
                Claude Code, OpenCode, Codex, Cursor, Antigravity, Command Code,
                and GitHub Copilot don&apos;t share a config format — but
                they&apos;ve converged more than you&apos;d expect. Each stores
                personas in a different path with different frontmatter keys.
                Maintaining the same agent across all of them means rewriting the
                same instructions seven times.
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
                the repo changes, add personas and skills as needed, sync the
                dashboard often.
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

          <section id="deck" className="hocus-section">
            <div className="hocus-section__meta">
              <div className="hocus-eyebrow">The command deck</div>
              <h2 className="hocus-section__title">hocus tui</h2>
            </div>
            <div className="hocus-section__body">
              <p>
                Running <code className="hocus-mono">hocus</code> with no arguments
                launches an interactive terminal deck for managing personas,
                tracking battle plans, chatting with agents, and watching
                compilation state. Six tabs, switched with{" "}
                <code className="hocus-mono">Tab</code> or the number keys.
              </p>
              <div className="hocus-workflow">
                {DECK_TABS.map((tab) => (
                  <div key={tab.name} className="hocus-workflow__step">
                    <code className="hocus-workflow__cmd">
                      {tab.key} · {tab.name}
                    </code>
                    <p className="hocus-workflow__body">{tab.body}</p>
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
              <p>
                Pick the naming convention at <code className="hocus-mono">hocus init</code>{" "}
                — Silicon Valley (Richard, Gilfoyle, Jared&hellip;) or Wizards
                (Merlin, Zoroaster, Roger Bacon&hellip;), or pass{" "}
                <code className="hocus-mono">--cast valley</code> /{" "}
                <code className="hocus-mono">--cast wizard</code>. The choice is
                cosmetic but it touches file names, skill IDs, and slash commands
                (<code className="hocus-mono">/merlin-draft-spell</code> vs{" "}
                <code className="hocus-mono">/richard-draft-spell</code>); it&apos;s
                saved in <code className="hocus-mono">.hocus/config.json</code> and
                sets the dashboard default. Roles, voices, glyphs, and behavior are
                identical either way, and <code className="hocus-mono">?cast=valley</code>{" "}
                / <code className="hocus-mono">?cast=occult</code> still toggles the
                dashboard visually.
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

hocus init --name my-project   # add --cast valley for Silicon Valley names
hocus cast                     # compile for every detected tool
hocus                          # launch the interactive command deck`}</pre>
              </div>
              <div className="hocus-section__actions">
                <TrackedLink
                  className="hocus-btn hocus-btn--primary"
                  href={HOCUS_GITHUB}
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="tool_link_click"
                  eventCategory="tool_engagement"
                  eventLabel="hocus_install_github"
                >
                  View on GitHub
                </TrackedLink>
                <TrackedLink
                  className="hocus-btn hocus-btn--ghost"
                  href="/products"
                  eventName="nav_click"
                  eventCategory="navigation"
                  eventLabel="hocus_install_all_products"
                >
                  All products
                </TrackedLink>
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
