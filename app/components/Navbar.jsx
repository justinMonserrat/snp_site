"use client";

/**
 * Navbar
 * - Desktop (>=900px): centered links only (no logo)
 * - Mobile (<900px): logo on the left, hamburger on the right, full-screen drawer
 * - Accessibility: skip link, aria-current on active link, Esc to close drawer
 */

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLinks({ items, pathname, onNavigate }) {
  return (
    <div className={styles.group}>
      {items.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${active ? styles.active : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Scrolled state for styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll when drawer is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      const scrollBarW = window.innerWidth - html.clientWidth;
      if (scrollBarW > 0) html.style.paddingRight = `${scrollBarW}px`;
    } else {
      html.style.overflow = "";
      html.style.paddingRight = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      html.style.paddingRight = "";
      body.style.overflow = "";
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((p) => !p), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const onKeyDown = useCallback((e) => { if (e.key === "Escape") setOpen(false); }, []);

  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className={styles.skip}>Skip to content</a>

      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          {/* Desktop: centered links only */}
          <nav className={`${styles.desktopOnly} ${styles.center}`} aria-label="Primary">
            <NavLinks items={links} pathname={pathname} />
          </nav>

          {/* Mobile: logo (hidden on desktop via CSS) */}
          <Link href="/" className={styles.logoWrap} aria-label="Home">
            <Image
              src="/images/snp_logo.png"
              alt="Shea Nicole Photography"
              width={240}
              height={60}
              className={styles.logo}
              priority
            />
          </Link>

          {/* Mobile menu button */}
          <button
            className={styles.menuBtn}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={toggle}
            data-open={open}
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
        </div>
      </header>

      {/* Backdrop & Drawer overlay */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={closeMenu}
      />

      <nav
        id="nav-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-label="Mobile"
        role="dialog"
        aria-modal="true"
        onKeyDown={onKeyDown}
      >
        <div className={styles.drawerContent}>
          <NavLinks items={[...links]} pathname={pathname} onNavigate={closeMenu} />

          {/* Social icons (mobile drawer) */}
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
        </div>
      </nav>
    </>
  );
}
