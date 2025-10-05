"use client";

/**
 * Home page (Client Component)
 *
 * Why client?
 * - Handles hero slideshow (timers, matchMedia) and responsive switching.
 * - Wraps ContactClient in <Suspense> so its useSearchParams() is safe with SSG.
 *
 * Key UX:
 * - Desktop: crossfading slideshow that advances every 12s (respects reduced motion).
 * - Mobile: a single static hero image for speed.
 *
 * Tweak points:
 * - Adjust DESKTOP_MQ to change the breakpoint for slideshow vs static image.
 * - Change SLIDE_MS to speed up / slow down slide rotation.
 * - Edit heroImages to update the slideshow set.
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import styles from "./styles/Home.module.css";
import ServicesPreview from "./homePages/ServicesPreview";
import AboutPreview from "./homePages/AboutPreview";
import PortfolioPreview from "./homePages/PortfolioPreview";
import ContactClient from "./contact/ContactClient";

const DESKTOP_MQ = "(min-width: 601px)";
const SLIDE_MS = 12000;

const heroImages = [
  { src: "/images/home/snp_hero1.jpg", alt: "Happy family at beach" },
  { src: "/images/home/snp_hero2.jpg", alt: "Happy family walking on path" },
  { src: "/images/home/snp_hero3.jpg", alt: "Happy family walking on trail" },
  { src: "/images/home/snp_hero4.jpg", alt: "Happy couple at a maternity sunset session" },
  { src: "/images/home/snp_hero5.jpg", alt: "Happy family walking at sunset" },
];

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Media query listeners: desktop breakpoint + reduced motion
  useEffect(() => {
    const mqDesktop = window.matchMedia(DESKTOP_MQ);
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateDesktop = () => setIsDesktop(mqDesktop.matches);
    const updateMotion = () => setReducedMotion(mqReduce.matches);

    updateDesktop();
    updateMotion();

    // Modern 'change' event for matchMedia
    mqDesktop.addEventListener("change", updateDesktop);
    mqReduce.addEventListener("change", updateMotion);

    return () => {
      mqDesktop.removeEventListener("change", updateDesktop);
      mqReduce.removeEventListener("change", updateMotion);
    };
  }, []);

  // Auto-advance slideshow (desktop only, and only if not reduced motion)
  useEffect(() => {
    if (!isDesktop || reducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [isDesktop, reducedMotion]);

  return (
    <>
      {/* HERO */}
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
              />
            ))}

          {/* Mobile: single static hero (lighter & fast) */}
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

          {/* Shade overlay for text contrast */}
          <div className={styles.shade} />

          {/* On-image copy + CTA */}
          <div className={styles.heroOverlay}>
            <h1>Shea Nicole Photography</h1>
            <p>Capturing your family&apos;s story from Rockwall, Texas to Dallas–Fort Worth.</p>
            {/* HERO CTAs */}
            <div className={styles.heroActions}>
              <Link
                href="https://clients.sheanicolephotography.com/booking/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEWS */}
      <ServicesPreview />
      <PortfolioPreview />
      <AboutPreview />

      {/* Contact form client component (uses useSearchParams) */}
      <Suspense fallback={null}>
        <ContactClient />
      </Suspense>
    </>
  );
}
