"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.brand}>
          <Link href="/" aria-label="Home">
            <Image
              src="/images/snp_logo.png"
              alt="Shea Nicole Photography"
              width={180}
              height={45}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        {/* Nav links */}
        <nav className={styles.links} aria-label="Footer Navigation">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
          <Link href="/availability">Calendar</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Socials */}
        <div className={styles.socials}>
          <a
            href="https://instagram.com/shea_nicole_photography"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com/sheanicolephotography"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            Facebook
          </a>
        </div>

        {/* Bottom line */}
        <div className={styles.copy}>
          <p>&copy; {new Date().getFullYear()} Shea Nicole Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
