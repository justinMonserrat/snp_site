// app/contact/page.jsx
// Server component: wraps the client form in <Suspense> to satisfy Next’s prerender rules.
// If you need static metadata, keep it here.

import { Suspense } from "react";
import ContactClient from "./ContactClient";

// Optional, tweak as you like
export const metadata = {
  title: "Contact — Shea Nicole Photography",
  description: "Questions, bookings, comments, or concerns.",
};

/**
 * The page only renders a Suspense boundary with the client form inside.
 * This prevents the CSR bailout error when the client code calls useSearchParams().
 */
export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactClient />
    </Suspense>
  );
}
