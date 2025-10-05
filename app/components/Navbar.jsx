"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "../styles/Navbar.module.css";

/* --------------------------
 *  Configure Nav Structure
 * -------------------------- */
const NAV_LEFT = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

const NAV_RIGHT = [
  { href: "/booking", label: "Booking" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || (pathname.startsWith(href) && pathname[href.length] === "/");
}

/** Row of links with active state. */
function NavLinks({ items, pathname, onNavigate }) {
  return (
    <div className={styles.navGroup}>
      {items.map(({ href, label, variant }) => {
        const active = isActive(pathname, href);
        const isCta = variant === "cta";
        const className = [
          styles.navLink,
          active && styles.isActive,
          isCta && styles.navLinkCta,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <Link
            key={href}
            href={href}
            className={className}
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
  const drawerRef = useRef(null);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Shadow/elevation after small scroll
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

      // Send focus into the drawer for keyboard users
      queueMicrotask(() => {
        const firstFocusable =
          drawerRef.current?.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
        firstFocusable?.focus();
      });
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
  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  const navClass = [styles.nav, scrolled && styles.navScrolled].filter(Boolean).join(" ");
  const leftBlockClass = [styles.desktopOnly, styles.centerBlock].join(" ");
  const rightBlockClass = leftBlockClass;

  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <header className={navClass}>
        <div className={styles.navInner}>
          {/* Desktop */}
          <nav className={leftBlockClass} aria-label="Primary">
            <NavLinks items={NAV_LEFT} pathname={pathname} />
          </nav>

          {/* Mobile-only */}
          <Link
            href="/"
            className={[styles.logoWrap, styles.mobileOnly].join(" ")}
            aria-label="Home"
          >
            <Image
              src="/images/snp_logo.png"
              alt="Shea Nicole Photography"
              width={180}
              height={48}
              className={styles.logo}
              priority
            />
          </Link>

          <nav className={rightBlockClass} aria-label="Primary">
            <NavLinks items={NAV_RIGHT} pathname={pathname} />
          </nav>

          {/* Mobile menu toggle (hamburger → X) */}
          <button
            className={[styles.menuBtn, styles.mobileOnly].join(" ")}
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

      {/* Backdrop (starts below header) */}
      <div
        className={[styles.backdrop, open && styles.backdropOpen].filter(Boolean).join(" ")}
        onClick={closeMenu}
      />

      {/* Mobile Drawer */}
      <nav
        id="nav-drawer"
        ref={drawerRef}
        className={[styles.drawer, open && styles.drawerOpen].filter(Boolean).join(" ")}
        aria-label="Mobile Navigation"
        role="dialog"
        aria-modal="true"
        onKeyDown={onKeyDown}
      >
        <div className={styles.drawerContent}>
          <NavLinks
            items={[...NAV_LEFT, ...NAV_RIGHT]}
            pathname={pathname}
            onNavigate={closeMenu}
          />

          {/* Socials (mobile drawer bottom) */}
          <div className={styles.drawerSocials}>
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
