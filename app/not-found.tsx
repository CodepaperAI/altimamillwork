import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function NotFound() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="section">
          <div className="container empty-state">
            <h3>Article not found</h3>
            <p>
              The requested Altima Millwork article may have moved or is not
              published yet.
            </p>
            <p style={{ marginTop: 24 }}>
              <Link className="cta-button" href="/blogs">
                Back to Blog
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
