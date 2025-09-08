"use client";

/**
 * Home page (client)
 * - Keeps hero slideshow logic on the client (window, useEffect).
 * - Wraps ContactClient in <Suspense> so its useSearchParams() won't trip SSG.
 * - Removes unused HomeClient import.
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo, Suspense } from "react";
import styles from "./styles/Home.module.css";
import ServicesPreview from "./homePages/ServicesPreview";
import AboutPreview from "./homePages/AboutPreview";
import PortfolioPreview from "./homePages/PortfolioPreview";
import ContactClient from "./contact/ContactClient";

const heroImages = [
  { src: "/images/home/snp_hero1.jpg", alt: "Happy family at beach" },
  { src: "/images/home/snp_hero2.jpg", alt: "Happy family walking on path" },
  { src: "/images/home/snp_hero3.jpg", alt: "Happy family walking on trail" },
  { src: "/images/home/snp_hero4.jpg", alt: "Happy couple maternity sunset" },
  { src: "/images/home/snp_hero5.jpg", alt: "Happy family walking at sunset" },
];

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.matchMedia("(min-width: 601px)").matches);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroImages.length), 12000);
    return () => clearInterval(id);
  }, [isDesktop]);

  // Precompute z-order so current slide sits on top
  const order = useMemo(() => heroImages.map((_, i) => (i === index ? 2 : 1)), [index]);

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          {/* Desktop: stacked slides for crossfade */}
          {isDesktop &&
            heroImages.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                className={`${styles.slide} ${i === index ? styles.isActive : ""}`}
                sizes="100vw"
                style={{ zIndex: order[i] }}
              />
            ))}

          {/* Mobile: single static hero */}
          {!isDesktop && (
            <Image
              src="/images/home/snp_hero_mobile.jpeg"
              alt="Happy family photography session"
              priority
              height={512}
              width={1024}
              className={styles.mobileHeroImg}
            />
          )}

          <div className={styles.shade} />

          <div className={styles.heroOverlay}>
            <h1>Shea Nicole Photography</h1>
            <p>Capturing your family&apos;s story from Rockwall, Texas to Dallas-Fort Worth.</p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.heroButton}>Book Now</Link>
            </div>
          </div>
        </div>
      </section>

      <ServicesPreview />
      <PortfolioPreview />
      <AboutPreview />

      {/* IMPORTANT: wrap the client form that uses useSearchParams */}
      <Suspense fallback={null}>
        <ContactClient />
      </Suspense>
    </main>
  );
}
