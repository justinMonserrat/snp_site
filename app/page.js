import Link from "next/link";
import Image from "next/image";
import styles from "./styles/Home.module.css";
import ServicesPreview from "./homePages/ServicesPreview";
import AboutPreview from "./homePages/AboutPreview";
import PortfolioPreview from "./homePages/PortfolioPreview";

export default function HomePage() {
  return (
    <>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            {/* Desktop */}
            <Image
              src="/images/home/snp_hero.JPG"
              alt="Happy family photography session"
              priority
              height={1024}
              width={2048}
              className={styles.desktopHeroImg}
            />
            {/* Mobile */}
            <Image
              src="/images/home/snp_hero_mobile.JPEG"
              alt="Happy family photography session"
              priority
              height={512}
              width={1024}
              className={styles.mobileHeroImg}
            />

            <div className={styles.shade} />

            <div className={styles.heroOverlay}>
              <h1>Shea Nicole Photography</h1>
              <p>Capturing your family&apos;s story from Rockwall, Texas to Dallas-Fort Worth.</p>

              <div className={styles.heroActions}>
                <a href="/contact" className={styles.heroButton}>Book Now</a>
              </div>
            </div>
          </div>
        </section>

        <ServicesPreview />
        <PortfolioPreview />
        <AboutPreview />
      </main>
    </>
  );
}
