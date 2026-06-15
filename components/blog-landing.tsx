import { ArrowRight, Factory, Hammer, Ruler, ShieldCheck } from "lucide-react";
import { BlogBrowser } from "@/components/blog-browser";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { BlogListResult } from "@/lib/upliftai";

type BlogLandingProps = {
  result: BlogListResult;
};

export function BlogLanding({ result }: BlogLandingProps) {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="container hero-content">
            <p className="eyebrow">Altima Millwork Journal</p>
            <h1>Ideas built for better commercial interiors</h1>
            <p className="hero-copy">
              Practical design, build, permit, and millwork guidance from the
              team behind turnkey hospitality, restaurant, office, showroom, and
              retail interiors across Canada and the GTA.
            </p>
            <div className="hero-actions">
              <a className="cta-button" href="#latest">
                Browse Articles <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="ghost-button" href="https://altimamillwork.com/contact-us/">
                Schedule Consultation
              </a>
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Altima Millwork highlights">
          <div className="container">
            <div className="stats-grid">
              <div className="stat">
                <strong>2013</strong>
                <span>Family-owned Canadian millwork company</span>
              </div>
              <div className="stat">
                <strong>13K</strong>
                <span>Sq. ft. Brampton factory and showroom</span>
              </div>
              <div className="stat">
                <strong>CNC</strong>
                <span>Italian machinery for precision fabrication</span>
              </div>
              <div className="stat">
                <strong>GTA</strong>
                <span>Commercial renovation and bespoke interiors</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Latest thinking</p>
                <h2 className="section-title">
                  Millwork, renovation, and fit-out articles
                </h2>
              </div>
              <p className="section-lede">
                Browse guidance for architectural millwork, cabinetry,
                casework, bespoke furniture, permits, and commercial
                construction decisions before the first drawing becomes a build.
              </p>
            </div>
            <BlogBrowser blogs={result.blogs} apiError={result.error} />
          </div>
        </section>

        <section className="section craft-band">
          <div className="container craft-grid">
            <div>
              <p className="section-kicker">Built under one roof</p>
              <h2 className="section-title">
                From concept drawings to finished installation
              </h2>
              <p className="hero-copy">
                Altima brings architects, permit specialists, carpenters,
                fabrication, project management, and installation crews together
                so commercial interiors move with fewer handoffs.
              </p>
            </div>
            <div className="service-list">
              <div className="service-item">
                <Ruler aria-hidden="true" />
                <h3>Architectural Millwork</h3>
                <p>Feature walls, panels, trims, detailed woodwork, and custom built-ins.</p>
              </div>
              <div className="service-item">
                <Factory aria-hidden="true" />
                <h3>Cabinetry & Casework</h3>
                <p>Durable storage and display systems for high-use commercial spaces.</p>
              </div>
              <div className="service-item">
                <Hammer aria-hidden="true" />
                <h3>Bespoke Furniture</h3>
                <p>Purpose-built desks, counters, seating, storage, and specialty pieces.</p>
              </div>
              <div className="service-item">
                <ShieldCheck aria-hidden="true" />
                <h3>Commercial Renovations</h3>
                <p>Design, permits, construction, finishes, and handover for turnkey projects.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="consultation">
              <div>
                <h2>Have a project that needs disciplined craft?</h2>
                <p>
                  Talk with Altima about your restaurant, hotel, office,
                  showroom, retail, or bespoke commercial interior project.
                </p>
              </div>
              <div className="consultation-actions">
                <a className="cta-button" href="https://altimamillwork.com/contact-us/">
                  Book Free Design Consultation
                </a>
                <a className="ghost-button" href="tel:+14168457265">
                  Call +1-416-845-7265
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
