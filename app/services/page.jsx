// app/services/page.jsx
// Services — single-page, CARD GRID version (image on top, text below)
// - No per-slug routes
// - Each service is a card with image + summary
// - Package options open inside the card via <details> dropdown
// - Reuses your /lib/services.js data
// - Uses existing card-related class names to minimize CSS churn

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Services.module.css";
import { services } from "../../lib/services";

const list = (arr) => (Array.isArray(arr) && arr.length ? arr.join(", ") : "—");

export const metadata = {
  title: "Services | Shea Nicole Photography",
  description:
    "Explore all services and package options—maternity, newborn, family, cake smash, and bundles—on one page.",
  openGraph: {
    title: "Services | Shea Nicole Photography",
    description:
      "Explore all services and package options—maternity, newborn, family, cake smash, and bundles—on one page.",
    type: "website",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.blurb,
      offers: { "@type": "Offer", price: s.price?.replace?.(/[^0-9–-]/g, ""), priceCurrency: "USD" },
    })),
  };

  return (
    <main className={styles.pageWrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Packages & Options</h1>
      </header>

      {/* Cards grid */}
      <section aria-labelledby="svc-grid-heading">

        <ul className={styles.servicesGrid} role="list">
          {services.map((svc, idx) => {
            const firstPkg = svc.packages?.[0];
            const deliverables = svc.deliverables ?? firstPkg?.deliverables;
            const bestFor = svc.bestFor ?? firstPkg?.bestFor;

            return (
              <li key={svc.slug} className={`${styles.card} ${styles.serviceCard}`}>
                {/* Image */}
                <div className={styles.figure}>
                  <Image
                    src={svc.img}
                    alt={svc.alt}
                    fill
                    sizes="(max-width: 680px) 100vw, (max-width: 1060px) 50vw, 33vw"
                    className={styles.img}
                    priority={idx < 2}
                  />
                </div>

                {/* Body */}
                <div className={styles.body}>
                  <h3 className={styles.title}>{svc.title}</h3>
                  <p className={styles.blurb}>{svc.blurb}</p>

                  <ul className={styles.bullets} style={{ marginTop: ".35rem" }}>
                    <li><strong>Session length:</strong> {svc.duration || firstPkg?.duration || "—"}</li>
                    <li><strong>Deliverables:</strong> {list(deliverables)}</li>
                    <li><strong>Best for:</strong> {list(bestFor)}</li>
                    <li><strong>Price:</strong> {svc.price || firstPkg?.price || "—"}</li>
                  </ul>

                  {/* CTAs */}
                  <div className={styles.detailCtas}>
                    <Link
                      href={`/contact?interest=${encodeURIComponent(svc.title)}`}
                      className={styles.primaryBtn}
                    >
                      Book {svc.title}
                    </Link>
                  </div>

                  {/* Dropdown for package options */}
                  {Array.isArray(svc.packages) && svc.packages.length > 0 && (
                    <details className={styles.pkgDetails}>
                      <summary className={styles.pkgSummary}>
                        View package options <span className={styles.pkgCount}>({svc.packages.length})</span>
                      </summary>

                      <ul className={styles.pkgList}>
                        {svc.packages.map((p) => (
                          <li key={p.name} className={styles.pkgCard}>
                            <div className={styles.pkgBody}>
                              <h4 className={styles.pkgTitle}>{p.name}</h4>
                              {p.duration && (
                                <p className={styles.pkgMeta}><strong>Duration:</strong> {p.duration}</p>
                              )}
                              {p.description && <p className={styles.pkgDesc}>{p.description}</p>}
                              {p.deliverables?.length ? (
                                <ul className={styles.bullets}>
                                  {p.deliverables.map((d) => <li key={d}>{d}</li>)}
                                </ul>
                              ) : null}
                              {p.notes?.length ? (
                                <p className={styles.pkgNotes}><em>{p.notes.join(" • ")}</em></p>
                              ) : null}
                              <div className={styles.pkgFooter}>
                                <span className={styles.price}>{p.price}</span>
                                <Link
                                  href={`/contact?interest=${encodeURIComponent(`${svc.title} — ${p.name}`)}`}
                                  className={styles.secondaryBtn}
                                >
                                  Book
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {/* Add-ons / notes */}
                  {Array.isArray(svc.addOns) && svc.addOns.length > 0 && (
                    <div className={styles.addOns}>
                      <h4 className={styles.addOnsTitle}>Add-ons</h4>
                      <ul className={styles.bullets}>
                        {svc.addOns.map((a) => (
                          <li key={a.label}>{a.label} — <strong>{a.price}</strong></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(svc.notes) && svc.notes.length > 0 && (
                    <p className={styles.smallNote}><em>{svc.notes.join(" ")}</em></p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* FAQs */}
      <section className={styles.faqsBlock} aria-labelledby="faqs-heading">
        <h2 id="faqs-heading" className={styles.sectionTitle}>FAQs</h2>
        <div className={styles.faqsStack}>
          <details className={styles.qa} name="faqs">
            <summary>What should we wear?</summary>
            <div>
              Pick 2–3 complementary colors and avoid large logos. I’ll send a simple styling guide after booking.
            </div>
          </details>
          <details className={styles.qa} name="faqs">
            <summary>Where do sessions take place?</summary>
            <div>
              Outdoors at golden hour, your home for lifestyle, or a local studio (upon request/availability).
            </div>
          </details>
          <details className={styles.qa} name="faqs">
            <summary>How do we receive images?</summary>
            <div>
              Edited images are delivered via an online gallery with print rights. Typical turnaround is 1–2 weeks.
            </div>
          </details>
          <details className={styles.qa} name="faqs">
            <summary>Do you require a deposit?</summary>
            <div>
              A small, non-refundable retainer secures your date; the remainder is due on session day.
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
