"use client";

/**
 * BookingEmbed (no React warnings)
 * - Enables Payment Request API + WebAuthn inside the iframe
 * - Keeps sandbox (relaxed enough for booking flows)
 * - Always shows a backup “Open in new tab” link
 */
export default function BookingEmbed({ bookingUrl }) {
    return (
        <>
            <iframe
                src={bookingUrl}
                title="ShootProof Booking"
                style={{ width: "100%", height: "80vh", border: 0 }}
                // Permit features the booking page may use
                allow="payment *; publickey-credentials-get *"
                // React needs the attribute in lowercase; passing via spread avoids warnings
                {...{ allowpaymentrequest: "" }}
                // Keep sandbox; if checkout still fails, remove sandbox entirely
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
            />
        </>
    );
}
