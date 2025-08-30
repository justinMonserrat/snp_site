"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "../styles/Navbar.module.css";

const leftLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
];

const rightLinks = [
  { href: "/availability", label: "Calendar" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const NavLinks = ({ items }) => (
    <div className={styles.group}>
      {items.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className={`${styles.link} ${active ? styles.active : ""}`}>
            {label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <NavLinks items={leftLinks} />

        <Link href="/" className={styles.logoWrap} aria-label="Home">
          { }
          <Image
            src="/images/snp_logo.png"
            alt="Shea Nicole Photography"
            width={240}
            height={60}
            className={styles.logo}
            priority
          />
        </Link>

        <NavLinks items={rightLinks} />
      </div>
    </header>
  );
}
