import Image from "next/image";
import styles from "./styles/Home.module.css";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <Image src="/hero.jpg" alt="Hero" fill priority className={styles.heroImg}/>
          <div className={styles.overlay}>
            <h1>Photography That Tells Your Story</h1>
            <p>Portraits • Events • Brands</p>
            <a href="/availability" className={styles.cta}>Check Availability</a>
          </div>
        </section>

        <section className={styles.grid}>
          <div>
            <h2>Featured Work</h2>
            <p>Hand-picked sessions from recent shoots.</p>
            <a href="/portfolio">View Portfolio →</a>
          </div>
          <div>
            <h2>Packages</h2>
            <p>Clear pricing for portraits, couples, and events.</p>
            <a href="/services">See Services →</a>
          </div>
          <div>
            <h2>About</h2>
            <p>Meet the photographer behind the lens.</p>
            <a href="/about">Learn More →</a>
          </div>
        </section>
      </main>
    </>
  );
}
