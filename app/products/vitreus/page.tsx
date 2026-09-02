import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Vitreus — Dark Magic Studios",
  description:
    "Vitreus is an AI-assisted Obsidian vault for tasks, project tracking, and journaling. Your tools, your files, your API keys — running locally through a harness you control.",
};

const BOX = [
  {
    label: "Six skills",
    body: "/vitreus-init, /setup-ai, /generate-report, /obsidian-plugin, /weekly-plan, /weekly-review.",
  },
  {
    label: "Five agents",
    body: "vault-curator, concierge, reporter, shrink, obsidianist — each with a job and a lane.",
  },
  {
    label: "A provider CLI",
    body: "Reference syncs for Linear, Singularity, and Locu, plus a template for adding whatever you use instead.",
  },
  {
    label: "A clean vault",
    body: "Four directories — knowledge, journal, reports, sessions — with neutral templates and sensible plugin defaults.",
  },
  {
    label: "Four god files",
    body: "AGENTS.md, TOOLS.md, SOUL.md, MEMORY.md — maintained by the agents, readable by you.",
  },
];

const MODES = [
  {
    mode: "mcp",
    body: "The AI harness talks to the tool's MCP server directly. No token stored in the vault at all.",
  },
  {
    mode: "rest",
    body: "A small script pulls from the tool's API. The token lives in scripts/.env, on your machine.",
  },
  {
    mode: "export",
    body: "You drop a CSV or JSON export into imports/ and the setup flow turns it into notes.",
  },
];

export default function VitreusPage() {
  return (
    <>
      <NavBar />
      <main>
        <section className="dm-subpage-hero">
          <div className="dm-subpage-hero__veil" aria-hidden="true" />
          <div className="dm-container dm-subpage-hero__inner">
            <div className="dm-eyebrow">Vitreus · In development</div>
            <h1 className="dm-subpage-hero__title">
              Your work, in plain<br />Markdown, kept current.
            </h1>
            <p className="dm-subpage-hero__lede">
              An AI-assisted Obsidian vault for tasks, project tracking, and
              journaling. Point it at the tools you already use and it keeps a
              running picture of your work — synced tasks, weekly plans, weekly
              reviews, and a knowledge base that gets health-checked instead of
              quietly rotting.
            </p>
            <div className="dm-product-tools" aria-label="Vitreus at a glance">
              {["Obsidian", "Claude Code", "OpenCode", "Local-first", "Markdown"].map((tag) => (
                <span key={tag} className="dm-product-tool">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="dm-container dm-veil-sections">
          <section id="idea" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">The idea</div>
              <h2 className="dm-veil-section__title">It is not an app</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                Every tool that promises to organise your work wants to become the
                place your work lives. Vitreus does the opposite. It is a vault
                skeleton plus a set of skills and agents for Claude Code or OpenCode
                — your files, your folder, your API keys, running locally through a
                harness you already control.
              </p>
              <p>
                Nothing is hosted by us. There is no account, no server holding your
                journal, and no migration to do if you decide to stop using it —
                you are left with a directory of Markdown, which is what you had
                underneath all along.
              </p>
            </div>
          </section>

          <div className="dm-veil-rule" aria-hidden="true" />

          <section id="box" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">What&apos;s in it</div>
              <h2 className="dm-veil-section__title">The pieces</h2>
            </div>
            <div className="dm-veil-section__body">
              <div className="dm-spec-list">
                {BOX.map((item) => (
                  <div key={item.label} className="dm-spec">
                    <div className="dm-spec__label">{item.label}</div>
                    <p className="dm-spec__body">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="dm-veil-rule" aria-hidden="true" />

          <section id="data" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">How data gets in</div>
              <h2 className="dm-veil-section__title">Three modes</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                Each tool you connect uses one of three routes, recorded in{" "}
                <code className="dm-mono">.vitreus/config.json</code>. Which one
                depends on what the tool offers, not on what we would prefer.
              </p>
              <div className="dm-spec-list">
                {MODES.map((m) => (
                  <div key={m.mode} className="dm-spec">
                    <code className="dm-spec__label dm-spec__label--mono">{m.mode}</code>
                    <p className="dm-spec__body">{m.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="dm-veil-rule" aria-hidden="true" />

          <section id="week" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">The week</div>
              <h2 className="dm-veil-section__title">Monday and Friday</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                Setup is three commands, run once. After that the vault only asks for
                twenty minutes a week, at both ends of it.
              </p>
              <div className="dm-code-block">
                <div className="dm-code-block__header">
                  <span className="dm-eyebrow">Terminal</span>
                </div>
                <pre className="dm-code-block__pre">{`/vitreus-init      # interview: your tools, your keys
/setup-ai          # connect MCP servers, build syncs, import exports
/generate-report   # baseline vault health check

/weekly-plan       # Monday — pending work into a realistic schedule
/weekly-review     # Friday — what shipped, what stalled, what carries over`}</pre>
              </div>
            </div>
          </section>

          <div className="dm-veil-rule" aria-hidden="true" />

          <section id="status" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">Status</div>
              <h2 className="dm-veil-section__title">In development</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                Vitreus is in daily use here and not yet released. It will be a paid
                product — one purchase, one person, and your vault content and API
                keys stay yours. The repository is private until launch.
              </p>
              <p>
                Requirements are modest: Obsidian, Node 20 and pnpm, and an AI
                harness — Claude Code, OpenCode, or Antigravity.
              </p>
              <div className="dm-veil-section__actions">
                <TrackedLink
                  className="dm-btn dm-btn--primary"
                  href="mailto:hello@darkmagicstudios.com?subject=Vitreus"
                  external
                  eventName="email_click"
                  eventCategory="contact"
                  eventLabel="vitreus_page"
                >
                  Ask us about Vitreus
                </TrackedLink>
                <TrackedLink
                  className="dm-btn dm-btn--ghost"
                  href="/products"
                  eventName="nav_click"
                  eventCategory="navigation"
                  eventLabel="vitreus_all_products"
                >
                  All products →
                </TrackedLink>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
