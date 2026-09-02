import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { Icon } = product;
  const isSoon = product.status === "soon";

  return (
    <article className={`dm-product-card${isSoon ? " dm-product-card--soon" : ""}`}>
      <div className="dm-product-card__header">
        {product.mark ? (
          <Image
            src={product.mark}
            alt=""
            width={40}
            height={40}
            className="dm-product-card__mark"
          />
        ) : Icon ? (
          <Icon className="dm-product-card__glyph" aria-hidden="true" />
        ) : null}
        <span className={`dm-product-card__status dm-product-card__status--${product.status}`}>
          {product.statusLabel}
        </span>
      </div>

      <div
        className={`dm-product-card__name ${product.wordmarkClass ?? "dm-product-card__name--plain"}`}
      >
        {product.name}
      </div>
      <p className="dm-product-card__tagline">{product.tagline}</p>
      <p className="dm-product-card__desc">{product.description}</p>

      <div className="dm-product-tools" aria-label={`${product.name} details`}>
        {product.tags.map((tag) => (
          <span key={tag} className="dm-product-tool">
            {tag}
          </span>
        ))}
      </div>

      {(product.href || product.github) && (
        <div className="dm-product-card__actions">
          {product.href && (
            <TrackedLink
              className="hocus-btn hocus-btn--primary"
              href={product.href}
              eventName="nav_click"
              eventCategory="navigation"
              eventLabel={`product_open_${product.slug}`}
            >
              {product.status === "free" ? `Open ${product.name}` : "Learn more"}
            </TrackedLink>
          )}
          {product.github && (
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
          )}
        </div>
      )}
    </article>
  );
}
