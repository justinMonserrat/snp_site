import Image from "next/image";
import styles from "./styles/Home.module.css";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <main>
        <section className={styles.hero}>
          <Image src="/images/snp_hero.jpg" alt="Hero" fill priority className={styles.heroImg}/>
        </section>

        <section className={styles.grid}>

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
