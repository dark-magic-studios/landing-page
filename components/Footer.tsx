import Image from "next/image";

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
          <div className="dm-footer__inscription">We were never here.</div>
        </div>

        <div className="dm-footer__cols">
          <div>
            <div className="dm-footer__head">Studio</div>
            <a className="dm-footer__link" href="#studio">About</a>
            <a className="dm-footer__link" href="#services">Services</a>
            <a className="dm-footer__link" href="#engagement">Engagement</a>
          </div>
          <div>
            <div className="dm-footer__head">The veil</div>
            <a className="dm-footer__link" href="#">NDA template</a>
            <a className="dm-footer__link" href="#">PGP key</a>
            <a className="dm-footer__link" href="#">Signal handle</a>
          </div>
          <div>
            <div className="dm-footer__head">Familiars</div>
            <a className="dm-footer__link" href="#">Apply quietly</a>
            <a className="dm-footer__link" href="#">Rates &amp; rules</a>
            <a className="dm-footer__link" href="#">Cover identities</a>
          </div>
        </div>
      </div>

      <div className="dm-footer__base">
        <span>© mmxxvi · Dark Magic Studios · all credit reserved to others</span>
        <span>By appointment only</span>
      </div>
    </footer>
  );
}
