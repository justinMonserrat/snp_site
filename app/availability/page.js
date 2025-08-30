export const metadata = { title: "Availability | SNP Photography" };

export default function AvailabilityPage() {
  return (
    <main style={{maxWidth: "1100px", margin: "40px auto", padding: "0 20px"}}>
      <h1>Availability</h1>
      <p>Pick a time that works for you.</p>
      <div style={{height: "800px", border: "1px solid #eee"}}>
        <iframe
          src="https://calendly.com/YOUR_HANDLE?hide_landing_page_details=1&hide_gdpr_banner=1"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Calendly"
        />
      </div>
    </main>
  );
}
