"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/previews/AboutPreview.module.css";


export default function AboutPreview() {
  return (
    <section className={styles.about}>
      {/* LEFT column: (mobile) title → image → button */}
      <div className={styles.aboutLeft}>
        <h2 className={styles.titleLeft}>Hi, I&apos;m Janine!</h2>

        <div className={styles.aboutMedia}>
          <Image
            src="/images/home/snp_janine_about.jpg"
            alt="Janine"
            width={800}
            height={1000}
            className={styles.aboutPhoto}
            priority
          />
        </div>

        <Link href="/about" className={styles.ctaLeft}>
          Learn More
        </Link>
      </div>

      {/* RIGHT column: (desktop) title → paragraph → button ; (mobile) paragraph only */}
      <div className={styles.aboutRight}>
        <h2 className={styles.titleRight}>Hi, My Name is Janine!</h2>

        <p>
          I am a lifestyle and portrait photographer located in Rockwall, Texas and I
          have made my way from the South Carolina Coast and Long Island, NY. It has
          been an honor for me to serve and get to know beautiful families like yours
          for over 9 years.
        </p>

        <Link href="/about" className={styles.ctaRight}>
          Learn More
        </Link>
      </div>
    </section>
  );
}