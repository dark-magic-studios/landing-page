import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrackedLink from "@/components/TrackedLink";
import { BUILDING, FREE_TOOLS, COMING_SOON } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — Dark Magic Studios",
  description:
    "Everything Dark Magic Studios is building: Hocus and Vitreus in active development, Signum free in the browser, Forgeboard and Pulsebook on the way.",
};

const GROUPS = [
  {
    id: "building",
    eyebrow: "— In our hands now",
    title: "Building",
    lede: "The two products taking most of our week. Hocus is out and usable today; Vitreus is close.",
    items: BUILDING,
  },
  {
    id: "free",
    eyebrow: "— Free, no account",
    title: "Free tools",
    lede: "Small utilities that run entirely in your browser. Nothing to install, nothing uploaded, no sign-up.",
    items: FREE_TOOLS,
  },
  {
    id: "soon",
    eyebrow: "— On the bench",
    title: "Coming",
    lede: "Next out of the workshop. No dates yet — we would rather show them late than promise them early.",
    items: COMING_SOON,
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
              Everything we&apos;re<br />building right now.
            </h1>
            <p className="dm-subpage-hero__lede">
              Two products in active development, one free tool you can use in the
              next thirty seconds, and two more on the bench. This page is the whole
              list — if it isn&apos;t here, we aren&apos;t working on it.
            </p>
          </div>
        </section>

        <div className="dm-container dm-product-gallery">
          {GROUPS.map((group) => (
            <section key={group.id} id={group.id} className="dm-product-group">
              <div className="dm-product-group__head">
                <div className="dm-eyebrow">{group.eyebrow}</div>
                <h2 className="dm-product-group__title">{group.title}</h2>
                <p className="dm-product-group__lede">{group.lede}</p>
              </div>
              <div className="dm-product-gallery__grid">
                {group.items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </section>
          ))}

          <div className="dm-product-gallery__footer">
            <p className="dm-product-gallery__note">
              Want one of these to do something it doesn&apos;t do yet? Tell us — we
              read every message.
            </p>
            <TrackedLink
              className="dm-btn dm-btn--primary"
              href="mailto:hello@darkmagicstudios.com"
              external
              eventName="email_click"
              eventCategory="contact"
              eventLabel="products_page_footer"
            >
              Write to us
            </TrackedLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
