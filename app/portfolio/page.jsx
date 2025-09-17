/**
 * Portfolio
 * - Loads first brand, then shows its events in a card grid.
 * - "View Gallery" links out to your public ShootProof client gallery domain.
 */
import styles from "../styles/Portfolio.module.css";

/**
 * Portfolio page
 * - Uses relative fetch (no NEXT_PUBLIC_BASE_URL needed on server)
 * - If 401, shows a Connect button to start OAuth
 */
export const dynamic = 'force-dynamic';

async function getBrands() {
  const r = await fetch('/api/shootproof/brands', { cache: 'no-store' });
  if (!r.ok) {
    return { errorStatus: r.status };
  }
  return r.json();
}

export default async function PortfolioPage() {
  const data = await getBrands();

  if (data?.errorStatus === 401) {
    return (
      <main style={styles.pfWrap}>
        <h1 style={styles.pfTitle}>Client Galleries</h1>
        <p>Connect your ShootProof account to load galleries.</p>
        <a className="pf-btn" href="/api/shootproof/login">Connect ShootProof</a>
      </main>
    );
  }
  if (data?.errorStatus) {
    return (
      <main style={styles.pfWrap}>
        <h1 style={styles.pfTitle}>Client Galleries</h1>
        <p>Couldn’t load brands (HTTP {data.errorStatus}).</p>
      </main>
    );
  }

  const brand = data?.items?.[0];
  if (!brand) {
    return (
      <main style={styles.pfWrap}>
        <h1 style={styles.pfTitle}>Client Galleries</h1>
        <p>No brand found. If you just connected, try refreshing.</p>
      </main>
    );
  }

  // (unchanged) fetch events via your /api/shootproof/events/[brandId]
  // ...
  return (
    <main style={styles.pfWrap}>
      <h1 style={styles.pfTitle}>Client Galleries</h1>
      {/* render cards once you wire events, same as before */}
    </main>
  );
}
