import Image from "next/image";
import Link from "next/link";

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
            <Link className="dm-footer__link" href="/#studio">About</Link>
            <Link className="dm-footer__link" href="/#software">Apps &amp; Tech</Link>
            <Link className="dm-footer__link" href="/#engagement">Process</Link>
          </div>
          <div>
            <div className="dm-footer__head">Contact</div>
            <a className="dm-footer__link" href="mailto:hello@darkmagicstudios.com">hello@darkmagicstudios.com</a>
          </div>
          <div>
            <div className="dm-footer__head">Products</div>
            <a className="dm-footer__link" href="/products">All products</a>
            <a className="dm-footer__link" href="/products/hocus">Hocus</a>
          </div>
          <div>
            <div className="dm-footer__head">Familiars</div>
            <a className="dm-footer__link" href="/familiars#apply">Apply quietly</a>
            <a className="dm-footer__link" href="/familiars#rates">Rates &amp; rules</a>
            <a className="dm-footer__link" href="/familiars#cover">Cover identities</a>
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

