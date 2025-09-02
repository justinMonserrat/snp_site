import Link from "next/link";
import Image from "next/image";
import styles from "./styles/Home.module.css";
import ServicesPreview from "./homePages/ServicesPreview";
import AboutPreview from "./homePages/AboutPreview";

export default function HomePage() {
  return (
    <>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <Image
              src="/images/snp_hero.jpg"
              alt="Happy family photography session"
              priority
              height={1024}
              width={2048}
              className={styles.heroImg}
            />

            <div className={styles.shade} />

            <div className={styles.heroOverlay}>
              <h1>Shea Nicole Photography</h1>
              <p>Capturing your family's story across Rockwall, Texas.</p>

              <div className={styles.heroActions}>
                <a href="/contact" className={styles.heroButton}>Book Now</a>
              </div>
            </div>
          </div>
        </section>

        <ServicesPreview />
        <AboutPreview />
      </main>
    </>
  );
}
