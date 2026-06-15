import Link from "next/link";

const logoUrl = "/assets/logo.webp";

export function SiteHeader() {
  return (
    <>
      <div className="top-bar">
        <div className="container top-bar-inner">
          <span>11 Edvac Drive, Units 13-19, Brampton, ON L6S 5W5</span>
          <span>
            <a href="mailto:info@altimamillwork.com">info@altimamillwork.com</a>{" "}
            &nbsp; | &nbsp;
            <a href="tel:+14168457265">+1-416-845-7265</a>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav">
          <Link className="brand" href="/" aria-label="Altima Millwork blog home">
            <img className="brand-mark" src={logoUrl} alt="Altima Millwork" />
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="https://altimamillwork.com/">Home</a>
            <a href="https://altimamillwork.com/services/">Services</a>
            <a href="https://altimamillwork.com/portfolio/">Our Work</a>
            <Link href="/blogs">Blog</Link>
            <a className="cta-button" href="https://altimamillwork.com/contact-us/">
              Free Consultation
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src={logoUrl} alt="Altima Millwork" />
            <p>
              Commercial renovation and custom millwork specialists serving
              hotels, restaurants, showrooms, offices, retail spaces, and
              bespoke interiors across the GTA.
            </p>
          </div>
          <div>
            <h3>Useful Links</h3>
            <ul>
              <li>
                <a href="https://altimamillwork.com/">Home</a>
              </li>
              <li>
                <a href="https://altimamillwork.com/millwork/">Millwork</a>
              </li>
              <li>
                <a href="https://altimamillwork.com/services/">Services</a>
              </li>
              <li>
                <a href="https://altimamillwork.com/portfolio/">Our Work</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contact Info</h3>
            <p>
              11 Edvac Drive, Units 13-19
              <br />
              Brampton, ON L6S 5W5
              <br />
              <a href="mailto:info@altimamillwork.com">info@altimamillwork.com</a>
              <br />
              <a href="tel:+14168457265">+1-416-845-7265</a>
            </p>
          </div>
        </div>
        <div className="copyright">
          Copyright © {new Date().getFullYear()} Altima Millwork Inc. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
