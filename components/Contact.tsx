"use client";

import { useState } from "react";

type Deadline = "easy" | "tight" | "yesterday";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    studio: "",
    contact: "",
    work: "",
    deadline: "tight" as Deadline,
    panic: 3,
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section className="dm-contact" id="contact" aria-labelledby="contact-heading">
      <div className="dm-contact__col dm-contact__col--text">
        <div className="dm-eyebrow">— Contact</div>
        <h2 id="contact-heading" className="dm-contact__title">
          Get in <em>touch.</em>
        </h2>
        <p className="dm-contact__lede">
          Have an inquiry regarding our software products, game systems, or technical
          collaborations? Reach out to our engineering team directly.
        </p>
        <div className="dm-contact__fineprint">
          <div>Independent studio.</div>
          <div>Open source software, developer tooling, &amp; games.</div>
        </div>
      </div>

      <form
        className="dm-contact__form"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        {sent ? (
          <div className="dm-contact__sent">
            <div className="dm-contact__sent-mark" aria-hidden="true">⌖</div>
            <h3 className="dm-contact__sent-title">Message sent.</h3>
            <p className="dm-contact__sent-body">
              Thank you for reaching out. We read every message and will respond within 48 hours.
            </p>
            <button
              type="button"
              className="dm-btn dm-btn--ghost"
              onClick={() => setSent(false)}
            >
              Send another
            </button>
          </div>
        ) : (
          <>
            <div className="dm-field">
              <label className="dm-field__label" htmlFor="studio">Your company or team</label>
              <input
                id="studio"
                className="dm-field__input"
                value={form.studio}
                onChange={update("studio")}
                placeholder="e.g. Acorn Software or Indie Game Lab"
                autoComplete="organization"
              />
            </div>

            <div className="dm-field">
              <label className="dm-field__label" htmlFor="contact">Contact email or handle</label>
              <input
                id="contact"
                className="dm-field__input"
                value={form.contact}
                onChange={update("contact")}
                placeholder="you@domain.tld or handle"
              />
            </div>

            <div className="dm-field">
              <label className="dm-field__label" htmlFor="work">Software project or inquiry</label>
              <textarea
                id="work"
                className="dm-field__input dm-field__input--area"
                rows={4}
                value={form.work}
                onChange={update("work")}
                placeholder="Describe your app, game engine, or software inquiry."
              />
            </div>

            <div className="dm-field dm-field--row">
              <div className="dm-field__seg">
                <div className="dm-field__label" id="deadline-label">Timeline</div>
                <div className="dm-seg" role="group" aria-labelledby="deadline-label">
                  {(["easy", "tight", "yesterday"] as Deadline[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`dm-seg__opt${form.deadline === d ? " is-on" : ""}`}
                      aria-pressed={form.deadline === d}
                      onClick={() => setForm((f) => ({ ...f, deadline: d }))}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="dm-field__seg">
                <label className="dm-field__label" htmlFor="panic">
                  Urgency level · {form.panic} / 5
                </label>
                <input
                  id="panic"
                  type="range"
                  min="1"
                  max="5"
                  value={form.panic}
                  onChange={(e) => setForm((f) => ({ ...f, panic: +e.target.value }))}
                  className="dm-range"
                />
              </div>
            </div>

            <button type="submit" className="dm-btn dm-btn--primary dm-btn--lg">
              Send message
            </button>
            <div className="dm-contact__nb">
              We respond to all technical and software inquiries within 48 hours.
            </div>
          </>
        )}
      </form>
    </section>
  );
}

