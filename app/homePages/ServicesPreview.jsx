// app/homePages/ServicesPreview.jsx
"use client";

/**
 * ServicesPreview (Home)
 * - 5-up row on desktop, responsive down to mobile
 * - Card = image, title, concise meta (duration • edited images), price
 * - No per-card buttons; section footer buttons only
 * - Data source: /lib/services.js
 */

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/previews/ServicesPreview.module.css";
import { services } from "../../lib/services";

/** Return the first deliverables line that mentions edited images, if any. */
function editedImagesSummary(deliverables) {
  if (!Array.isArray(deliverables)) return null;
  return deliverables.find((d) => /edited images/i.test(d)) || null;
}

export default function ServicesPreview() {
  const items = Array.isArray(services) ? services : [];

  return (
    <section className={styles.previewWrap} aria-labelledby="svc-prev-heading">
      <header className={styles.previewHeader}>
        <h2 id="svc-prev-heading" className={styles.previewTitle}>
          Services
        </h2>
        <p className={styles.previewIntro}>
          Each Service has different packages to suit your needs.
        </p>
      </header>

      <ul className={styles.grid} role="list">
        {items.map((svc, idx) => {
          const firstPkg = svc.packages?.[0];
          const duration = svc.duration || firstPkg?.duration || "";
          const edited = editedImagesSummary(svc.deliverables ?? firstPkg?.deliverables);
          const meta = [duration, edited].filter(Boolean).join(" • ");
          const price = svc.price || firstPkg?.price || "—";

          return (
            <li key={svc.slug} className={styles.card}>
              {/* Media */}
              <div className={styles.figure}>
                <Image
                  src={svc.img}
                  alt={svc.alt}
                  fill
                  priority={idx < 2}
                  sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  className={styles.img}
                />
              </div>

              {/* Text */}
              <div className={styles.body}>
                <h3 className={styles.title}>{svc.title}</h3>
                {meta && <p className={styles.meta}>{meta}</p>}
                <p className={styles.price}>{price}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer CTAs (centered) */}
      <div className={styles.ctaRow}>
        <Link
          href="https://calendly.com/YOUR-CALENDLY-USERNAME" // ← replace with your Calendly link
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          Book your session
        </Link>
        <Link href="/services" className={`${styles.btn} ${styles.btnSecondary}`}>
          View Services
        </Link>
      </div>
    </section>
  );
}
