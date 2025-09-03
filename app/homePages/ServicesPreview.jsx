"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef} from "react";
import styles from "../styles/ServicesPreview.module.css";

function useScroller() {
  const ref = useRef(null);
  const scrollBy = (dx) => ref.current && ref.current.scrollBy({ left: dx, behavior: "smooth" });
  return [ref, scrollBy];
}

const items = [
  {
    slug: "lifestyle",
    href: "/services/lifestyle",
    title: "Lifestyle",
    blurb: "30–90+ min • 12–20+ edited images",
    price: "$250-$350+",
    img: "/images/home/snp_lifestyle.jpg",
    alt: "Parents holding newborn in park",
  },
  {
    slug: "maternity",
    href: "/services/maternity",
    title: "Maternity",
    blurb: "30–90 min • 12–35+ edited images",
    price: "$250–$425",
    img: "/images/home/snp_maternity.jpg",
    alt: "Sunlit maternity portrait",
  },
  {
    slug: "cake-smash",
    href: "/services/cake-smash",
    title: "Cake Smash",
    blurb: "30–90 min • 8–30+ edited images",
    price: "$225–$350",
    img: "/images/home/snp_cakesmash.jpg",
    alt: "Toddler at first birthday cake smash",
  },
];

export default function ServicesPreview() {
  const [trackRef, scrollBy] = useScroller();

  return (
    <section className={styles.wrap} aria-labelledby="services-heading">
      <div className={styles.headerRow}>
        <h2 id="services-heading">Services</h2>
      </div>

      {/* Mobile: horizontally scrollable track (snap) / Desktop: 3-column grid */}
      <div className={styles.scroller}>
        <button
          type="button"
          aria-label="Scroll left"
          className={`${styles.scrollBtn} ${styles.left}`}
          onClick={() => scrollBy(-320)}
        >
          ‹
        </button>

        <ul
          ref={trackRef}
          className={styles.grid}
          aria-label="Service cards"
        >
          {items.map((it) => (
            <li key={it.slug} className={styles.card}>
              <Link href={it.href} className={styles.cardLink}>
                <div className={styles.figure}>
                  <Image
                    src={it.img}
                    alt={it.alt}
                    fill
                    sizes="(max-width: 720px) 85vw, (max-width: 1024px) 45vw, 33vw"
                    className={styles.img}
                    priority
                  />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{it.title}</h3>
                  <p className={styles.blurb}>{it.blurb}</p>
                  <span className={styles.price}>{it.price}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Scroll right"
          className={`${styles.scrollBtn} ${styles.right}`}
          onClick={() => scrollBy(320)}
        >
          ›
        </button>
      </div>

      <div className={styles.ctaRow}>
        <Link href="/contact" className={styles.cta}>
          Book your session
        </Link>
        <Link href="/services" className={styles.secondary}>
          See more →
        </Link>
      </div>
    </section>
  );
}
