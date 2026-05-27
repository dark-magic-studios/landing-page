import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Familiars — Dark Magic Studios",
  description: "Join the Dark Magic Studios contractor network. Rates, rules, and how to apply quietly.",
};

export default function FamiliarsPage() {
  return (
    <>
      <NavBar />
      <main>
        <section className="dm-subpage-hero">
          <div className="dm-subpage-hero__veil" aria-hidden="true" />
          <div className="dm-container dm-subpage-hero__inner">
            <div className="dm-eyebrow">Familiars</div>
            <h1 className="dm-subpage-hero__title">We are always looking<br />for the right kind of quiet.</h1>
            <p className="dm-subpage-hero__lede">
              Familiars are the contractors and collaborators who do the actual
              work alongside us — artists, engineers, writers, sound designers.
              Credit goes to the client. Satisfaction goes to craft.
            </p>
          </div>
        </section>

        <div className="dm-container dm-veil-sections">

          <section id="apply" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">Step I</div>
              <h2 className="dm-veil-section__title">Apply quietly</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                No open calls. No public portfolio reviews. If you have found
                this page you are already doing it right.
              </p>
              <p>
                Send a brief introduction — who you are, what you make, and one
                piece of work you are genuinely proud of — to our Signal handle
                or via encrypted email. We read everything and reply to what
                fits. No acknowledgement does not mean no; it means not yet.
              </p>
              <div className="dm-familiars-traits">
                <div className="dm-eyebrow" style={{ marginBottom: "18px" }}>We respond well to</div>
                <ul className="dm-familiars-list">
                  <li>Specialists who go deep rather than wide</li>
                  <li>People comfortable working without a byline</li>
                  <li>Contractors who set boundaries and keep them</li>
                  <li>Work that speaks before credentials do</li>
                </ul>
              </div>
              <div className="dm-veil-section__actions">
                <a className="dm-btn dm-btn--primary" href="/the-veil#signal">
                  Send via Signal
                </a>
                <a className="dm-btn dm-btn--ghost-outline" href="/the-veil#pgp">
                  Send encrypted email
                </a>
              </div>
            </div>
          </section>

          <div className="dm-veil-rule" aria-hidden="true" />

          <section id="rates" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">Step II</div>
              <h2 className="dm-veil-section__title">Rates &amp; rules</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                We pay above market rate for above market work. Rate cards are
                negotiated per engagement, not per person. Bring your number;
                we will tell you honestly whether we can meet it.
              </p>
              <div className="dm-familiars-rules">
                <div className="dm-familiars-rule">
                  <span className="dm-eyebrow">Payment</span>
                  <p>
                    Milestone-based. Fifty percent on scope approval; remainder
                    within seven days of delivery acceptance. We do not do
                    thirty-day net.
                  </p>
                </div>
                <div className="dm-familiars-rule">
                  <span className="dm-eyebrow">Confidentiality</span>
                  <p>
                    All familiars sign the same NDA as our clients. The name of
                    the project, the client, and the scope are all covered.
                    Permanently. Universally.
                  </p>
                </div>
                <div className="dm-familiars-rule">
                  <span className="dm-eyebrow">IP ownership</span>
                  <p>
                    Work-for-hire by default. Everything you produce on a
                    project belongs to the client the moment it is delivered.
                    You retain nothing except the knowledge that you made it.
                  </p>
                </div>
                <div className="dm-familiars-rule">
                  <span className="dm-eyebrow">Communication</span>
                  <p>
                    We keep it async. Availability windows are agreed upfront.
                    Emergencies are called emergencies explicitly — and we do
                    not use that word loosely.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="dm-veil-rule" aria-hidden="true" />

          <section id="cover" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">Step III</div>
              <h2 className="dm-veil-section__title">Cover identities</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                Ghost work means ghost credits. You will not see your name in
                the game, on the album, or in the code repository. You will
                know you were there. We will know. That is enough.
              </p>
              <p>
                In return, we do not ask where else you are working, what other
                studios you collaborate with, or what your real name is if you
                prefer to use a handle. We extend the same discretion we expect.
              </p>
              <div className="dm-familiars-cover-note">
                <em>
                  On rare occasions a client will ask for a credit under a
                  studio-owned name. We discuss this before the engagement
                  begins. You always have the option to decline without
                  affecting the working relationship.
                </em>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
