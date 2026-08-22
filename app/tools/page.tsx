import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tools — Dark Magic Studios",
  description:
    "Free browser-based tools from Dark Magic Studios. Signum fills in and signs PDFs entirely client-side — nothing is ever uploaded.",
};

const TOOLS = [
  {
    slug: "signum",
    name: "signum",
    tagline: "text · date · company · logo · signature",
    description:
      "Fill in and sign a PDF right in your browser. Drop in typed fields and a cursive signature, then export the finished document — the file never leaves your tab.",
    tags: ["Client-side", "No upload", "Free"],
    status: "Live",
    href: "/tools/signum",
  },
];

export default function ToolsPage() {
  return (
    <>
      <NavBar />
      <main>
        <section className="dm-subpage-hero">
          <div className="dm-subpage-hero__veil" aria-hidden="true" />
          <div className="dm-container dm-subpage-hero__inner">
            <div className="dm-eyebrow">Tools</div>
            <h1 className="dm-subpage-hero__title">
              Small instruments,<br />used often.
            </h1>
            <p className="dm-subpage-hero__lede">
              Free, browser-based utilities from the studio. No accounts, no
              uploads to a server — everything runs on your machine.
            </p>
          </div>
        </section>

        <div className="dm-container dm-product-gallery">
          <div className="dm-product-gallery__grid">
            {TOOLS.map((tool) => (
              <article key={tool.slug} className="dm-product-card">
                <div className="dm-product-card__header">
                  <svg
                    className="dm-product-card__mark"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 20L14.5 9.5C15.5 8.5 15.5 7 14.5 6C13.5 5 12 5 11 6L2 15V20H4Z"
                      stroke="#8b5cf6"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <path d="M11.5 8.5L16 4M20 8L22 6" stroke="#00ff66" strokeWidth="1.4" strokeLinecap="round" />
                    <circle cx="20.5" cy="18.5" r="2.7" stroke="#00ff66" strokeWidth="1.3" />
                  </svg>
                  <span className="dm-product-card__status">{tool.status}</span>
                </div>

                <div className="dm-product-card__name--plain">{tool.name}</div>
                <p className="dm-product-card__tagline">{tool.tagline}</p>
                <p className="dm-product-card__desc">{tool.description}</p>

                <div className="dm-product-tools" aria-label="Tool traits">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="dm-product-tool">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="dm-product-card__actions">
                  <Link className="hocus-btn hocus-btn--primary" href={tool.href}>
                    Open tool
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
