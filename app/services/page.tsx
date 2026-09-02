import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Engagement from "@/components/Engagement";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "What we do — Dark Magic Studios",
  description:
    "Dark Magic Studios builds developer tools, apps, and game systems — our own products first, plus a limited amount of client work in the same three areas.",
};

const GOOD_FITS = [
  "A tool your team keeps meaning to build and never gets to",
  "An app that needs to feel fast and stay small",
  "Game systems, save formats, and designer-facing tooling",
  "An existing codebase that works but nobody wants to touch",
];

const BAD_FITS = [
  "Brochure sites and CMS theming",
  "Staff augmentation by the month",
  "Anything that needs a team of ten by Friday",
];

export default function ServicesPage() {
  return (
    <>
      <NavBar />
      <main>
        <section className="dm-subpage-hero">
          <div className="dm-subpage-hero__veil" aria-hidden="true" />
          <div className="dm-container dm-subpage-hero__inner">
            <div className="dm-eyebrow">What we do</div>
            <h1 className="dm-subpage-hero__title">
              We build software,<br />and we keep it small.
            </h1>
            <p className="dm-subpage-hero__lede">
              A small independent studio working in three areas: developer tools,
              apps, and the systems underneath games. Most of our week goes into our
              own products — the rest is open to a couple of client projects a year.
            </p>
          </div>
        </section>

        <Services id="capabilities" />

        <Engagement />

        <div className="dm-container dm-veil-sections">
          <section id="client-work" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">Client work</div>
              <h2 className="dm-veil-section__title">Hiring us</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                We take on a small number of client projects — enough to stay sharp
                and pay for the products, not enough to become an agency. That means
                we are honest about fit before anyone signs anything, and we will
                tell you when a project is not one.
              </p>

              <div className="dm-fit-grid">
                <div className="dm-fit">
                  <div className="dm-eyebrow">Good fits</div>
                  <ul className="dm-familiars-list">
                    {GOOD_FITS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="dm-fit">
                  <div className="dm-eyebrow">Not us</div>
                  <ul className="dm-familiars-list dm-familiars-list--muted">
                    {BAD_FITS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p>
                Work is scoped in writing before it starts, delivered in a repository
                you own, and documented well enough that you could hand it to someone
                else tomorrow. Credit goes wherever you want it to go — including
                nowhere.
              </p>

              <div className="dm-veil-section__actions">
                <TrackedLink
                  className="dm-btn dm-btn--primary"
                  href="mailto:hello@darkmagicstudios.com"
                  external
                  eventName="email_click"
                  eventCategory="contact"
                  eventLabel="services_client_work"
                >
                  Tell us about the project
                </TrackedLink>
                <TrackedLink
                  className="dm-btn dm-btn--ghost"
                  href="/products"
                  eventName="nav_click"
                  eventCategory="navigation"
                  eventLabel="services_see_products"
                >
                  See what we build →
                </TrackedLink>
              </div>
              <p className="dm-veil-section__fine">
                Looking to work <em>with</em> us rather than hire us? The{" "}
                <TrackedLink
                  className="dm-inline-link"
                  href="/familiars"
                  eventName="nav_click"
                  eventCategory="navigation"
                  eventLabel="services_to_familiars"
                >
                  familiars page
                </TrackedLink>{" "}
                is for contractors and collaborators.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
