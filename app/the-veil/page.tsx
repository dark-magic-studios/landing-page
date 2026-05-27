import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Veil — Dark Magic Studios",
  description: "Confidentiality tools and secure contact channels for Dark Magic Studios clients.",
};

export default function TheVeilPage() {
  return (
    <>
      <NavBar />
      <main>
        <section className="dm-subpage-hero">
          <div className="dm-subpage-hero__veil" aria-hidden="true" />
          <div className="dm-container dm-subpage-hero__inner">
            <div className="dm-eyebrow">The Veil</div>
            <h1 className="dm-subpage-hero__title">What happens here<br />stays here.</h1>
            <p className="dm-subpage-hero__lede">
              Every engagement is sealed behind an NDA before the first word is
              exchanged. These are the instruments we use to keep it that way.
            </p>
          </div>
        </section>

        <div className="dm-container dm-veil-sections">

          <section id="nda" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">Document I</div>
              <h2 className="dm-veil-section__title">NDA template</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                Our standard mutual non-disclosure agreement. It is written in
                plain English, covers both parties equally, and has a five-year
                term. If your legal counsel wants to redline it, send a marked
                copy — we read every word.
              </p>
              <p>
                We do not work without one. No exceptions. The NDA is not a
                formality; it is the load-bearing wall of how we operate.
              </p>
              <div className="dm-veil-section__actions">
                <a className="dm-btn dm-btn--primary" href="/nda-template.pdf" download>
                  Download NDA · PDF
                </a>
                <a className="dm-btn dm-btn--ghost-outline" href="/nda-template.docx" download>
                  Download NDA · DOCX
                </a>
              </div>
              <p className="dm-veil-section__fine">
                Last revised mmxxvi · Governed by the laws of the jurisdiction
                we have already agreed upon in private.
              </p>
            </div>
          </section>

          <div className="dm-veil-rule" aria-hidden="true" />

          <section id="pgp" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">Document II</div>
              <h2 className="dm-veil-section__title">PGP key</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                For material you would rather not trust to a contact form. Our
                public key is below. Encrypt with it; only we can read what
                arrives.
              </p>
              <div className="dm-veil-pgp">
                <div className="dm-veil-pgp__header">
                  <span className="dm-eyebrow">Public key · 4096-bit RSA</span>
                  <button
                    className="dm-btn dm-btn--ghost-outline dm-veil-pgp__copy"
                    type="button"
                    aria-label="Copy PGP key to clipboard"
                  >
                    Copy
                  </button>
                </div>
                <pre className="dm-veil-pgp__block">{`-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBGZDarkMagicABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/AAAAAAAAA
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
[ placeholder — replace with your real public key ]
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
=XXXX
-----END PGP PUBLIC KEY BLOCK-----`}</pre>
              </div>
              <p className="dm-veil-section__fine">
                Fingerprint: DEAD BEEF CAFE 0000 · Updated mmxxvi
              </p>
            </div>
          </section>

          <div className="dm-veil-rule" aria-hidden="true" />

          <section id="signal" className="dm-veil-section">
            <div className="dm-veil-section__meta">
              <div className="dm-eyebrow">Channel III</div>
              <h2 className="dm-veil-section__title">Signal handle</h2>
            </div>
            <div className="dm-veil-section__body">
              <p>
                If the matter is time-sensitive or you prefer not to leave a
                written trail anywhere we do not control, Signal is the right
                door to knock on. Messages are end-to-end encrypted and
                disappear on a timer we set together.
              </p>
              <div className="dm-veil-signal">
                <div className="dm-veil-signal__handle">
                  <span className="dm-eyebrow">Handle</span>
                  <span className="dm-veil-signal__value">@darkmagic.xx</span>
                </div>
                <p className="dm-veil-signal__note">
                  <em>
                    We check Signal during business hours in our timezone. If
                    something is urgent, say so in the first message and we will
                    respond accordingly.
                  </em>
                </p>
              </div>
              <p className="dm-veil-section__fine">
                Do not use Signal for file transfers larger than 50 MB. Use the
                encrypted email channel instead.
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
