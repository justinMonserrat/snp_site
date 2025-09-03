"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Navbar.module.css";

const leftLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

const rightLinks = [
  { href: "/availability", label: "Calendar" },
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

  // close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // scrolled state for style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll when menu is open (html + body)
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      // prevent background scroll on all engines
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      // optional: avoid layout shift when hiding scrollbar (desktop)
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

  const toggle = useCallback(() => setOpen(p => !p), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const onKeyDown = useCallback((e) => { if (e.key === "Escape") setOpen(false); }, []);

  const socialLinks = [
    { href: "https://instagram.com/shea_nicole_photography", label: "Instagram" },
    { href: "https://facebook.com/sheanicolephotography", label: "Facebook" },
  ];

  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className={styles.skip}>Skip to content</a>

      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          {/* Desktop: left links */}
          <nav className={`${styles.desktopOnly} ${styles.left}`} aria-label="Primary (left)">
            <NavLinks items={leftLinks} pathname={pathname} />
          </nav>

          {/* Logo (center desktop; left on mobile via CSS) */}
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

          {/* Desktop: right links */}
          <nav className={`${styles.desktopOnly} ${styles.right}`} aria-label="Primary (right)">
            <NavLinks items={rightLinks} pathname={pathname} />
          </nav>

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

      {/* Backdrop & Drawer live OUTSIDE header so they can overlay everything */}
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
          {/* main links stacked */}
          <NavLinks
            items={[...leftLinks, ...rightLinks]}
            pathname={pathname}
            onNavigate={closeMenu}
          />

          {/* social links only for mobile drawer */}
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
