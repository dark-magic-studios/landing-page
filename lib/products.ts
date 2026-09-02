import { Signature, Vote, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProductStatus = "live" | "free" | "building" | "soon";

export type Product = {
  slug: string;
  name: string;
  /** Wordmark rendered in the product's own type treatment, when it has one. */
  wordmarkClass?: string;
  tagline: string;
  description: string;
  tags: string[];
  status: ProductStatus;
  statusLabel: string;
  /** Internal page, when there is one to link to. */
  href?: string;
  /** Public repo, when the source is open. */
  github?: string;
  mark?: string;
  Icon?: LucideIcon;
};

export const BUILDING: Product[] = [
  {
    slug: "hocus",
    name: "hocus",
    wordmarkClass: "hocus-wordmark",
    tagline: "thirteen agents · one repo · zero stand ups",
    description:
      "A multi-agent harness generator. Write one SOUL.md persona and compile it into native formats for Claude Code, OpenCode, Cursor, and Antigravity — instead of maintaining the same instructions four times.",
    tags: ["Claude Code", "OpenCode", "Cursor", "Antigravity"],
    status: "live",
    statusLabel: "Live",
    href: "/products/hocus",
    github: "https://github.com/dark-magic-studios/hocus",
    mark: "/products/hocus/mark.png",
  },
  {
    slug: "vitreus",
    name: "Vitreus",
    tagline: "your tools, your files, your keys",
    description:
      "An AI-assisted Obsidian vault for tasks, planning, and journaling. Point it at Linear, Todoist, Toggl, or your calendar and it keeps a running picture of your work in plain Markdown — running locally, through a harness you control.",
    tags: ["Obsidian", "Claude Code", "Local-first", "Markdown"],
    status: "building",
    statusLabel: "In development",
    href: "/products/vitreus",
    mark: "/products/vitreus/mark.png",
  },
];

export const FREE_TOOLS: Product[] = [
  {
    slug: "signum",
    name: "signum",
    tagline: "text · date · company · logo · signature",
    description:
      "Fill in and sign a PDF right in your browser. Drop in typed fields and a cursive signature, then export the finished document — the file never leaves your tab.",
    tags: ["Client-side", "No upload", "Free"],
    status: "free",
    statusLabel: "Free",
    href: "/tools/signum",
    Icon: Signature,
  },
];

export const COMING_SOON: Product[] = [
  {
    slug: "forgeboard",
    name: "Forgeboard",
    tagline: "ask · vote · ship · announce",
    description:
      "Feature requests, voting, a public roadmap, and a changelog in one place — built for indie game developers, and priced like it. The existing options are sold to enterprises and charge accordingly.",
    tags: ["Indie games", "Roadmap", "Changelog"],
    status: "soon",
    statusLabel: "Coming soon",
    Icon: Vote,
  },
  {
    slug: "pulsebook",
    name: "Pulsebook",
    tagline: "one tap a day, on every device",
    description:
      "A mood and habit journal in the Daylio mould, with the thing Daylio never shipped: real cross-device sync. Web and phone, same entries, no export-import dance.",
    tags: ["iOS", "Android", "Web", "Sync"],
    status: "soon",
    statusLabel: "Coming soon",
    Icon: HeartPulse,
  },
];

export const ALL_PRODUCTS: Product[] = [...BUILDING, ...FREE_TOOLS, ...COMING_SOON];
