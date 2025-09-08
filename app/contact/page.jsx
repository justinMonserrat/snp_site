"use client";

/**
 * /app/contact/page.jsx
 * - Same pattern as your ContactPreview (client-side fetch + honeypot)
 * - Adds an "What’s this about?" <select> that auto-selects from ?interest=
 * - Does NOT prefill Subject/Message; user types those
 * - Sends JSON to /api/contact with { name, email, phone, message, interest }
 */

import { useEffect, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "..//styles/Contact.module.css";
import { services } from "../../lib/services";

const FETCH_TIMEOUT_MS = 15000;

// Build dropdown options from your services catalog.
function buildInterestOptions(preselect) {
  const opts = [{ value: "", label: "General inquiry" }];

  services.forEach((s) => {
    opts.push({ value: `${s.title}`, label: `${s.title}` });
  });

  // Allow exact passthrough for package-deep links like "Maternity — The Total Bump"
  if (preselect && !opts.some((o) => o.value === preselect)) {
    opts.push({ value: preselect, label: preselect });
  }
  return opts;
}

export default function ContactPage() {
  const uid = useId();
  const sp = useSearchParams();

  // Normalize interest from the URL (if present)
  const preselectedInterest = (() => {
    const raw = sp?.get("interest") || "";
    try { return decodeURIComponent(raw).trim(); } catch { return raw.trim(); }
  })();

  const [form, setForm] = useState({
    interest: preselectedInterest || "",
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "", debug: "" });

  // If interest changes in the URL (client nav), reflect it once.
  useEffect(() => {
    if (preselectedInterest) {
      setForm((s) => ({ ...s, interest: preselectedInterest }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedInterest]);

  const options = buildInterestOptions(form.interest);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };
  const markTouched = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  // Client-side validation mirrored to server basics
  const errors = {
    name:
      form.name.trim().length === 0
        ? "Please enter your name."
        : form.name.trim().length > 100
          ? "Name is too long."
          : "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : "Enter a valid email.",
    phone:
      form.phone.trim() && !/^[\d\s()+\-\.]{7,20}$/.test(form.phone)
        ? "Enter a valid phone number."
        : "",
    message:
      form.message.trim().length < 10
        ? "Please include a short message (10+ characters)."
        : form.message.trim().length > 5000
          ? "Message is too long."
          : "",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "idle", message: "", debug: "" });

    // Honeypot trip → silently fail
    if (form.website) {
      setStatus({ type: "error", message: "Submission failed.", debug: "" });
      return;
    }

    if (hasErrors) {
      setTouched({ name: true, email: true, phone: !!form.phone, message: true });
      setStatus({ type: "error", message: "Please fix the highlighted fields.", debug: "" });
      return;
    }

    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);

    try {
      setStatus({ type: "loading", message: "Sending…", debug: "" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        cache: "no-store",
        signal: ctrl.signal,
        body: JSON.stringify({
          interest: form.interest, // ← include selected interest
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        const txt = await res.text();
        data = { error: txt || "Unknown server response." };
      }

      if (!res.ok) {
        const msg = data?.error || `Request failed (${res.status})`;
        const dbg = data?.debug || "";
        throw new Error([msg, dbg].filter(Boolean).join(" • "));
      }

      setStatus({ type: "success", message: "Thanks! Your message has been sent.", debug: "" });
      setForm({ interest: "", name: "", email: "", phone: "", message: "", website: "" });
      setTouched({});
    } catch (err) {
      const msg =
        err?.name === "AbortError"
          ? "Request timed out—please try again."
          : err?.message || "Something went wrong. Please try again.";
      setStatus({ type: "error", message: msg, debug: "" });
    } finally {
      clearTimeout(t);
    }
  }

  return (
    <section className={styles.wrap} aria-labelledby={`${uid}-heading`}>
      <div className={styles.headerRow}>
        <h2 id={`${uid}-heading`}>Contact</h2>
        <p className={styles.sub}>Questions, bookings, comments, or concerns.</p>
      </div>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        {/* Honeypot */}
        <div className={styles.hp} aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input
            id={`${uid}-website`}
            name="website"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            value={form.website}
            onChange={update}
          />
        </div>

        {/* Interest dropdown (auto-selected from ?interest=) */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-interest`}>Inquiry Topic</label>
          <select
            id={`${uid}-interest`}
            name="interest"
            className={styles.input}
            value={form.interest}
            onChange={update}
          >
            {options.map((o) => (
              <option key={o.value || "general"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-name`}>Name</label>
          <input
            id={`${uid}-name`}
            className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ""}`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={form.name}
            onChange={update}
            onBlur={markTouched}
            aria-invalid={!!(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? `${uid}-name-help` : undefined}
          />
          {touched.name && errors.name && (
            <p id={`${uid}-name-help`} className={styles.help}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-email`}>Email</label>
          <input
            id={`${uid}-email`}
            className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ""}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update}
            onBlur={markTouched}
            aria-invalid={!!(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? `${uid}-email-help` : undefined}
          />
          {touched.email && errors.email && (
            <p id={`${uid}-email-help`} className={styles.help}>{errors.email}</p>
          )}
        </div>

        {/* Phone (optional) */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-phone`}>Phone (optional)</label>
          <input
            id={`${uid}-phone`}
            className={`${styles.input} ${touched.phone && errors.phone ? styles.inputError : ""}`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(123) 456-7890"
            value={form.phone}
            onChange={update}
            onBlur={markTouched}
            aria-invalid={!!(touched.phone && errors.phone)}
            aria-describedby={touched.phone && errors.phone ? `${uid}-phone-help` : undefined}
          />
          {touched.phone && errors.phone && (
            <p id={`${uid}-phone-help`} className={styles.help}>{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-message`}>Message</label>
          <textarea
            id={`${uid}-message`}
            className={`${styles.textarea} ${touched.message && errors.message ? styles.inputError : ""}`}
            name="message"
            rows={6}
            required
            minLength={10}
            maxLength={5000}
            value={form.message}
            onChange={update}
            onBlur={markTouched}
            aria-invalid={!!(touched.message && errors.message)}
            aria-describedby={touched.message && errors.message ? `${uid}-message-help` : undefined}
          />
          {touched.message && errors.message && (
            <p id={`${uid}-message-help`} className={styles.help}>{errors.message}</p>
          )}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cta}
            type="submit"
            disabled={status.type === "loading"}
            aria-busy={status.type === "loading"}
          >
            {status.type === "loading" ? "Sending…" : "Send message"}
          </button>

          <span aria-live="polite" className={styles.statusWrap}>
            {status.type === "success" && <span className={styles.success}>{status.message}</span>}
            {status.type === "error" && <span className={styles.error}>{status.message}</span>}
          </span>
        </div>

        {/* DEV-ONLY: show server debug if present */}
        {status.type === "error" && status.debug && process.env.NODE_ENV !== "production" && (
          <pre className={styles.help} style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
            {status.debug}
          </pre>
        )}
      </form>
    </section>
  );
}
