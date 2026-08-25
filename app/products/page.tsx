import type { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Products — Dark Magic Studios",
  description:
    "Open-source tools from Dark Magic Studios. Hocus compiles one SOUL.md persona into Claude Code, OpenCode, Cursor, and Antigravity formats.",
};

const HOCUS_GITHUB = "https://github.com/dark-magic-studios/hocus";

const PRODUCTS = [
  {
    slug: "hocus",
    name: "hocus",
    tagline: "thirteen agents · one repo · zero stand ups",
    description:
      "Multi-agent harness generator. Write one SOUL.md persona once — compile to Claude Code, OpenCode, Cursor, and Antigravity.",
    tools: ["Claude Code", "OpenCode", "Cursor", "Antigravity"],
    status: "Launch",
    href: "/products/hocus",
    github: HOCUS_GITHUB,
  },
];

export default function ProductsPage() {
  return (
    <>
      <NavBar />
      <main>
        <section className="dm-subpage-hero">
          <div className="dm-subpage-hero__veil" aria-hidden="true" />
          <div className="dm-container dm-subpage-hero__inner">
            <div className="dm-eyebrow">Products</div>
            <h1 className="dm-subpage-hero__title">
              Instruments we<br />release into the wild.
            </h1>
            <p className="dm-subpage-hero__lede">
              Open-source tools built for the same multi-agent workflows we use
              behind the veil. MIT licensed. No stand ups required.
            </p>
          </div>
        </section>

        <div className="dm-container dm-product-gallery">
          <div className="dm-product-gallery__grid">
            {PRODUCTS.map((product) => (
              <article key={product.slug} className="dm-product-card">
                <div className="dm-product-card__header">
                  <Image
                    src={`/products/${product.slug}/mark.png`}
                    alt=""
                    width={40}
                    height={40}
                    className="dm-product-card__mark"
                  />
                  <span className="dm-product-card__status">{product.status}</span>
                </div>

                <div className="hocus-wordmark dm-product-card__name">{product.name}</div>
                <p className="dm-product-card__tagline">{product.tagline}</p>
                <p className="dm-product-card__desc">{product.description}</p>

                <div className="dm-product-tools" aria-label="Supported agent tools">
                  {product.tools.map((tool) => (
                    <span key={tool} className="dm-product-tool">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="dm-product-card__actions">
                  <TrackedLink
                    className="hocus-btn hocus-btn--primary"
                    href={product.href}
                    eventName="nav_click"
                    eventCategory="navigation"
                    eventLabel={`product_learn_more_${product.slug}`}
                  >
                    Learn more
                  </TrackedLink>
                  <TrackedLink
                    className="hocus-btn hocus-btn--ghost"
                    href={product.github}
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="tool_link_click"
                    eventCategory="tool_engagement"
                    eventLabel={`github_${product.slug}`}
                  >
                    View on GitHub
                  </TrackedLink>
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
