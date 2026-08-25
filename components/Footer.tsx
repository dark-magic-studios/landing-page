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
          <div className="dm-footer__inscription">Apps, games, and developer tools.</div>
        </div>

        <div className="dm-footer__cols">
          <div>
            <div className="dm-footer__head">Studio</div>
            <TrackedLink className="dm-footer__link" href="/#studio" eventName="nav_click" eventCategory="navigation" eventLabel="footer_about">About</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/#software" eventName="nav_click" eventCategory="navigation" eventLabel="footer_apps_tech">Apps &amp; Tech</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/#engagement" eventName="nav_click" eventCategory="navigation" eventLabel="footer_process">Process</TrackedLink>
          </div>
          <div>
            <div className="dm-footer__head">Contact</div>
            <TrackedLink className="dm-footer__link" href="mailto:hello@darkmagicstudios.com" external eventName="email_click" eventCategory="contact" eventLabel="footer">hello@darkmagicstudios.com</TrackedLink>
          </div>
          <div>
            <div className="dm-footer__head">Products</div>
            <TrackedLink className="dm-footer__link" href="/products" eventName="nav_click" eventCategory="navigation" eventLabel="footer_all_products">All products</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/products/hocus" eventName="nav_click" eventCategory="navigation" eventLabel="footer_hocus">Hocus</TrackedLink>
          </div>
          <div>
            <div className="dm-footer__head">Familiars</div>
            <TrackedLink className="dm-footer__link" href="/familiars#apply" eventName="nav_click" eventCategory="navigation" eventLabel="footer_familiars_apply">Apply quietly</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/familiars#rates" eventName="nav_click" eventCategory="navigation" eventLabel="footer_familiars_rates">Rates &amp; rules</TrackedLink>
            <TrackedLink className="dm-footer__link" href="/familiars#cover" eventName="nav_click" eventCategory="navigation" eventLabel="footer_familiars_cover">Cover identities</TrackedLink>
          </div>
        </div>
      </div>

      <div className="dm-footer__base">
        <span>© mmxxvi · Dark Magic Studios · Independent Software Studio</span>
        <span>Developer tools &amp; games</span>
      </div>
    </footer>
  );
}

