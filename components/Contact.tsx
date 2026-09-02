import TrackedLink from "@/components/TrackedLink";

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
          Questions about a product, an idea for one, or a project you want built?
          Email is the whole process. We read everything and usually reply within a
          day or two.
        </p>
        <div className="dm-contact__fineprint">
          <div>Small independent studio.</div>
          <div>Developer tools, apps, &amp; game systems.</div>
        </div>
      </div>

      <div className="dm-contact__card">
        <div className="dm-contact__card-label">Email</div>
        <TrackedLink
          className="dm-contact__card-email"
          href={`mailto:${EMAIL}`}
          external
          eventName="email_click"
          eventCategory="contact"
          eventLabel="contact_section_address"
        >
          {EMAIL}
        </TrackedLink>
        <p className="dm-contact__card-note">
          No forms, no funnels, no discovery call before the discovery call. Write
          to us and you get a real reply.
        </p>
        <TrackedLink
          className="dm-btn dm-btn--primary dm-btn--lg"
          href={`mailto:${EMAIL}`}
          external
          eventName="email_click"
          eventCategory="contact"
          eventLabel="contact_section_cta"
        >
          Write to us
        </TrackedLink>
      </div>
    </section>
  );
}
