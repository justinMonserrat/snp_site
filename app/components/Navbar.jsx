import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.nav}>
      <nav className={styles.inner}>
        <div className={styles.left}>
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/services">Services</Link>
        </div>

        <Link href="/https://res.cloudinary.com/dtdff485o/image/upload/v1756588170/snp_logo_pxnsjg.png" className={styles.logo}></Link>

        <div className={styles.right}>
          <Link href="/availability">Calendar</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
