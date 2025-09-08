"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import styles from "../styles/previews/PortfolioPreview.module.css";

const shots = [
  { src: "/images/home/homePortfolio/snp_p_couples.jpg", alt: "Couples portrait", tag: "Couples", href: "/portfolio#couples" },
  { src: "/images/home/homePortfolio/snp_p_newborn.jpg", alt: "Newborn wrapped portrait", tag: "Newborn", href: "/portfolio#newborn" },
  { src: "/images/home/homePortfolio/snp_p_family.jpg", alt: "Family laughing outdoors", tag: "Family", href: "/portfolio#family" },
  { src: "/images/home/homePortfolio/snp_p_maternity.jpg", alt: "Maternity pose at sunset", tag: "Maternity", href: "/portfolio#maternity" },
  { src: "/images/home/homePortfolio/snp_p_cake.jpg", alt: "Cake smash moment", tag: "Cake Smash", href: "/portfolio#cake" },
];

export default function PortfolioPreview() {
  const trackRef = useRef(null);

  const handleScroll = (dx) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dx, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.wrap} aria-labelledby="portfolio-heading">
      <div className={styles.headerRow}>
        <h2 id="portfolio-heading">Portfolio</h2>
      </div>
      <div className={styles.scroller}>
        <button
          type="button"
          aria-label="Scroll left"
          className={`${styles.scrollBtn} ${styles.left}`}
          onClick={() => handleScroll(-320)}
        >
          ‹
        </button>

        <ul ref={trackRef} className={styles.stage} aria-label="Portfolio preview">
          {shots.map((s, i) => (
            <li key={i} className={styles.card}>
              <Link href={s.href} className={styles.cardLink}>
                <div className={styles.figure}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 600px) 90vw,
                          (max-width: 1024px) 45vw,
                          30vw"
                    className={styles.img}
                    priority={i < 3}
                  />
                  <span className={styles.tag}>{s.tag}</span>
                  <span className={styles.scrim} aria-hidden="true" />
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Scroll right"
          className={`${styles.scrollBtn} ${styles.right}`}
          onClick={() => handleScroll(320)}
        >
          ›
        </button>
      </div>
      <div className={styles.ctaRow}>
        <Link href="/portfolio" className={styles.cta}>Explore the gallery</Link>
      </div>
    </section>
  );
}
