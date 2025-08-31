import Link from "next/link";
import Image from "next/image";
import styles from "./styles/Home.module.css";

export default function HomePage() {
  return (
    <>
      <main>
        <section className={styles.hero}>
          <Image
            src="/images/snp_hero.jpg"
            alt="Hero"
            width={2048}          
            height={1382}         
            priority
            sizes="100vw"
            className={styles.heroImg}
          />
        </section>

        <section className={styles.about}>
          {/* LEFT column: (mobile) title → image → button */}
          <div className={styles.aboutLeft}>
            <h2 className={styles.titleLeft}>Hi, I'm Janine!</h2>

            <div className={styles.aboutMedia}>
              <Image
                src="/images/snp_janine_about.jpg"
                alt="Janine"
                width={800}
                height={1000}
                sizes="(max-width: 768px) 44vw, (max-width: 1100px) 38vw, 420px"
                className={styles.aboutPhoto}
                priority
              />
            </div>

            <Link href="/about" className={styles.ctaLeft}>
              Learn More
            </Link>
          </div>

          {/* RIGHT column: (desktop) title → paragraph → button ; (mobile) paragraph only */}
          <div className={styles.aboutRight}>
            <h2 className={styles.titleRight}>Hi, My Name is Janine!</h2>

            <p>
              I am a lifestyle and portrait photographer located in Rockwall, Texas and I
              have made my way from the South Carolina Coast and Long Island, NY. It has
              been an honor for me to serve and get to know beautiful families like yours
              for over 9 years.
            </p>

            <Link href="/about" className={styles.ctaRight}>
              Learn More
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
