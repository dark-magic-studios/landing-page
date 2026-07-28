import Image from "next/image";
import Link from "next/link";

const HOCUS_GITHUB = "https://github.com/dark-magic-studios/hocus";

const SUPPORTED_TOOLS = ["Claude Code", "OpenCode", "Cursor", "Antigravity"];

export default function Products() {
  return (
    <section className="dm-products-teaser" id="products" aria-labelledby="products-heading">
      <div className="dm-section__head">
        <div className="dm-eyebrow">— Products</div>
        <h2 id="products-heading" className="dm-section__title">
          Tools we <em>ship.</em>
        </h2>
        <p className="dm-section__lede">
          Open-source instruments from the studio — built for the same multi-agent
          workflows we use behind the veil.
        </p>
      </div>

      <div className="dm-products-teaser__card">
        <div className="dm-products-teaser__mark">
          <Image
            src="/products/hocus/mark.png"
            alt=""
            width={48}
            height={48}
            className="dm-products-teaser__mark-img"
          />
        </div>
        <div className="dm-products-teaser__body">
          <div className="hocus-wordmark">hocus</div>
          <p className="dm-products-teaser__tagline">
            thirteen agents · one repo · zero stand ups
          </p>
          <p className="dm-products-teaser__desc">
            A multi-agent harness generator. Write one{" "}
            <code className="hocus-mono">SOUL.md</code> persona once — compile it
            into native agent formats for every tool you use.
          </p>
          <div className="dm-product-tools" aria-label="Supported agent tools">
            {SUPPORTED_TOOLS.map((tool) => (
              <span key={tool} className="dm-product-tool">
                {tool}
              </span>
            ))}
          </div>
        </div>
        <div className="dm-products-teaser__actions">
          <Link className="hocus-btn hocus-btn--primary" href="/products/hocus">
            Learn more
          </Link>
          <a
            className="hocus-btn hocus-btn--ghost"
            href={HOCUS_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="dm-products-teaser__footer">
        <Link className="dm-products-teaser__all" href="/products">
          View all products →
        </Link>
      </div>
    </section>
  );
}
