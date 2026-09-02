import Image from "next/image";
import TrackedLink from "@/components/TrackedLink";

export default function Footer() {
  return (
    <footer className="dm-footer" role="contentinfo">
      <div className="dm-footer__inner">
        <div className="dm-footer__brand">
          <Image
            src="/wordmark.png"
            alt="DARK MAGIC STUDIOS"
            width={260}
            height={60}
            className="dm-footer__wordmark"
          />
          <div className="dm-footer__inscription">Developer tools, apps, and game systems.</div>
        </div>

        <div className="dm-footer__cols">
          <div>
            <div className="dm-footer__head">What we do</div>
            <TrackedLink className="dm-footer__link" href="/services" eventName="nav_click" eventCategory="navigation" eventLabel="footer_services">Our work</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/services#engagement" eventName="nav_click" eventCategory="navigation" eventLabel="footer_process">How we work</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/services#client-work" eventName="nav_click" eventCategory="navigation" eventLabel="footer_client_work">Hiring us</TrackedLink>
          </div>
          <div>
            <div className="dm-footer__head">What we&apos;re building</div>
            <TrackedLink className="dm-footer__link" href="/products" eventName="nav_click" eventCategory="navigation" eventLabel="footer_all_products">All products</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/products/hocus" eventName="nav_click" eventCategory="navigation" eventLabel="footer_hocus">Hocus</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/products/vitreus" eventName="nav_click" eventCategory="navigation" eventLabel="footer_vitreus">Vitreus</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/tools/signum" eventName="nav_click" eventCategory="navigation" eventLabel="footer_signum">Signum (free)</TrackedLink>
          </div>
          <div>
            <div className="dm-footer__head">Work with us</div>
            <TrackedLink className="dm-footer__link" href="/familiars" eventName="nav_click" eventCategory="navigation" eventLabel="footer_familiars">Apply to work with us</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/familiars#rates" eventName="nav_click" eventCategory="navigation" eventLabel="footer_familiars_rates">Rates &amp; rules</TrackedLink>
          </div>
          <div>
            <div className="dm-footer__head">Contact</div>
            <TrackedLink className="dm-footer__link" href="mailto:hello@darkmagicstudios.com" external eventName="email_click" eventCategory="contact" eventLabel="footer">hello@darkmagicstudios.com</TrackedLink>
          </div>
        </div>
      </div>

      <div className="dm-footer__base">
        <span>© mmxxvi · Dark Magic Studios · Independent Software Studio</span>
        <span>Developer tools, apps &amp; games</span>
      </div>
    </footer>
  );
}
