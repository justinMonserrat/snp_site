// app/book/page.jsx
import BookingEmbed from "@/app/components/BookingEmbed";
import styles from "../styles/Booking.module.css";

/**
 * Book Page
 * - Shows live ShootProof booking embed for LIMITED "Mini" events.
 * - Directs customers to Services/Contact for all other sessions & dates.
 */
export const metadata = { title: "Booking | Shea Nicole Photography" };
export const dynamic = "force-static";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

export default function BookPage() {
    return (
        <main className={styles.wrap}>
            {/* Header */}
            <header className={styles.header}>
                <p className={styles.kicker}>Limited-Time Minis</p>
                <h1 className={styles.title}>Book a Session</h1>
            </header>

            {/* Mini Events Notice */}
            <section className={styles.notice} aria-label="Mini events details">
                <h2 className={styles.noticeTitle}>What to know about Minis</h2>
                <ul className={styles.noticeList}>
                    <li>Short & sweet sessions on select dates only.</li>
                    <li>Pre-set locations and times - first come, first served.</li>
                    <li>Perfect for quick updates (families, couples, portraits).</li>
                </ul>
                <div className={styles.actions}>
                    <a className={`${styles.btn} ${styles.btnPrimary}`} href="/services">
                        View All Services
                    </a>
                    <a className={`${styles.btn} ${styles.btnSecondary}`} href="/contact">
                        Contact for Other Dates
                    </a>
                </div>
            </section>

            {/* Embed */}
            <p className={`${styles.btn} ${styles.btnSecondary}`}>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    Open booking in a new tab
                </a>
            </p>
            <section className={styles.embedWrap} aria-label="Live booking">
                <BookingEmbed bookingUrl={BOOKING_URL} />
            </section>

        </main>
    );
}
