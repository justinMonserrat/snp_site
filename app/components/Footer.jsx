"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Nav links */}
        <nav className={styles.linksTop} aria-label="Footer Navigation">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
        </nav>
        <nav className={styles.linksBottom} aria-label="Footer Navigation">
          <Link href="/about">About</Link>
          <Link href="/availability">Calendar</Link>
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
            <Image src="/images/icons/instagram.png" alt="Instagram" width={40} height={40} />
          </a>
          <a
            href="https://facebook.com/sheanicolephotography"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Image src="/images/icons/facebook.png" alt="Facebook" width={40} height={40} />
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
