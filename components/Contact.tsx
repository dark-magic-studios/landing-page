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
          Send the <em>sigil.</em>
        </h2>
        <p className="dm-contact__lede">
          Tell us, briefly, what needs finishing. We read every message ourselves
          and reply within 48 hours. If we are not the right familiars, we will
          say so plainly and pass you a name.
        </p>
        <div className="dm-contact__fineprint">
          <div>By appointment only.</div>
          <div>No portfolio. No testimonials. No public client list.</div>
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
            <h3 className="dm-contact__sent-title">The sigil has been sent.</h3>
            <p className="dm-contact__sent-body">
              We will reply within 48 hours. Watch your inbox for a message from a
              name you don&rsquo;t recognise; that will be us.
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
              <label className="dm-field__label" htmlFor="studio">Your studio</label>
              <input
                id="studio"
                className="dm-field__input"
                value={form.studio}
                onChange={update("studio")}
                placeholder="Hollow Lantern Games"
                autoComplete="organization"
              />
            </div>

            <div className="dm-field">
              <label className="dm-field__label" htmlFor="contact">A way to reach you</label>
              <input
                id="contact"
                className="dm-field__input"
                value={form.contact}
                onChange={update("contact")}
                placeholder="you@studio.tld · or signal handle"
              />
            </div>

            <div className="dm-field">
              <label className="dm-field__label" htmlFor="work">The work</label>
              <textarea
                id="work"
                className="dm-field__input dm-field__input--area"
                rows={4}
                value={form.work}
                onChange={update("work")}
                placeholder="In one paragraph: what is the project, what is broken, and when does it need to ship."
              />
            </div>

            <div className="dm-field dm-field--row">
              <div className="dm-field__seg">
                <div className="dm-field__label" id="deadline-label">Deadline</div>
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
                  Panic level · {form.panic} / 5
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
              Send the sigil
            </button>
            <div className="dm-contact__nb">
              By sending you agree to nothing. The séance is free.
            </div>
          </>
        )}
      </form>
    </section>
  );
}
