const EMAIL = "hello@darkmagicstudios.com";

export default function Contact() {
  return (
    <section className="dm-contact" id="contact" aria-labelledby="contact-heading">
      <div className="dm-contact__col dm-contact__col--text">
        <div className="dm-eyebrow">— Contact</div>
        <h2 id="contact-heading" className="dm-contact__title">
          Get in <em>touch.</em>
        </h2>
        <p className="dm-contact__lede">
          Have an inquiry regarding our software products, game systems, or technical
          collaborations? Reach our engineering team directly by email — we read
          every message and reply within 48 hours.
        </p>
        <div className="dm-contact__fineprint">
          <div>Independent studio.</div>
          <div>Open source software, developer tooling, &amp; games.</div>
        </div>
      </div>

      <div className="dm-contact__card">
        <div className="dm-contact__card-label">Email</div>
        <a className="dm-contact__card-email" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <p className="dm-contact__card-note">
          No forms, no friction. Write to us and a human on the engineering team
          will get back to you.
        </p>
        <a className="dm-btn dm-btn--primary dm-btn--lg" href={`mailto:${EMAIL}`}>
          Write to us
        </a>
      </div>
    </section>
  );
}
