// app/api/contact/route.js
export const runtime = "nodejs";           // ensure Node runtime
export const dynamic = "force-dynamic";    // always run on server

import { Resend } from "resend";

/* ---------- helpers ---------- */
function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const sanitize = (s) =>
  String(s ?? "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[\r\n]+/g, "\n")
    .trim();

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const validate = ({ name, email, phone, message, interest }) => {
  const errs = {};
  if (!name || name.length > 100) errs.name = "Name is required and must be ≤ 100 chars.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) errs.email = "Valid email required.";
  if (phone && !/^[\d\s()+\-\.]{7,20}$/.test(phone)) errs.phone = "Invalid phone.";
  if (!message || message.length < 10 || message.length > 5000)
    errs.message = "Message must be 10–5000 characters.";
  if ((interest || "").length > 200) errs.interest = "Interest is too long.";
  return errs;
};

const htmlEmail = ({ brand, name, email, phone, message, interest }) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f7;padding:24px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <tr><td align="center">
    <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e9eaeb">
      <tr>
        <td style="padding:18px 22px;background:#111;color:#fff;display:flex;align-items:center;gap:12px">
          ${brand.logo ? `<img src="${esc(brand.logo)}" width="28" height="28" alt="" style="display:block;border:0;border-radius:6px" />` : ""}
          <div style="font-weight:700;font-size:17px;letter-spacing:.3px">
            ${brand.url ? `<a href="${esc(brand.url)}" style="color:#fff;text-decoration:none">${esc(brand.name || "")}</a>` : esc(brand.name || "")}
          </div>
        </td>
      </tr>
      <tr><td style="padding:20px 22px">
        <div style="font-size:18px;font-weight:700;color:#111;margin-bottom:8px">New Contact Message</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f2;border-radius:12px;margin-bottom:14px">
          ${[
    ["Interest", esc(interest || "—")],
    ["Name", esc(name)],
    ["Email", esc(email)],
    ["Phone", esc(phone || "—")]
  ].map(([k, v]) => `
            <tr><td style="padding:10px 16px;border-bottom:1px solid #f2f3f5">
              <strong style="display:inline-block;width:110px">${k}:</strong> ${v}
            </td></tr>`).join("")}
        </table>
        <div style="font-weight:600;color:#111;margin:0 0 8px">Message</div>
        <div style="border:1px solid #eef0f2;border-radius:12px;padding:14px 16px;background:#fff;color:#111;font-size:15px;line-height:1.6;white-space:pre-wrap">
${esc(message)}
        </div>
      </td></tr>
      <tr>
        <td style="padding:16px 22px;background:#fafafa;color:#6b7280;font-size:12px;line-height:1.5">
          Sent from the website contact form.
        </td>
      </tr>
    </table>
  </td></tr>
</table>`;

const textEmail = ({ name, email, phone, message, interest }) =>
  [
    "New Contact Message",
    "--------------------",
    `Interest: ${interest || "—"}`,
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Phone:    ${phone || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n");

/* ---------- POST handler ---------- */
export async function POST(req) {
  // Only accept JSON from the client fetch
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return json({ error: "Expected application/json." }, 415);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  const data = {
    interest: sanitize(body.interest),
    name: sanitize(body.name),
    email: sanitize(body.email),
    phone: sanitize(body.phone),
    message: sanitize(body.message),
  };

  const errs = validate(data);
  if (Object.keys(errs).length) {
    return json({ error: "Validation failed.", details: errs }, 400);
  }

  const {
    RESEND_API_KEY,
    CONTACT_TO,
    EMAIL_FROM,
    SUBJECT_PREFIX = "",
    BRAND_NAME = "Website",
    BRAND_URL = "",
    BRAND_LOGO = "",
  } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO || !EMAIL_FROM) {
    return json({ error: "Email is not configured." }, 500);
  }

  const resend = new Resend(RESEND_API_KEY);

  // Subject: include interest if present
  const baseSubject =
    data.interest ? `Inquiry: ${data.interest}` : `New message from ${data.name}`;
  const subject = `${SUBJECT_PREFIX ? SUBJECT_PREFIX + " " : ""}${baseSubject}`;
  const brand = { name: BRAND_NAME, url: BRAND_URL, logo: BRAND_LOGO };

  try {
    const visitorEmail = (data.email || "").trim();
    const visitorName = (data.name || "").trim();
    const replyToValue = visitorName
      ? `"${visitorName.replace(/"/g, "'")}" <${visitorEmail}>`
      : visitorEmail;

    const res = await resend.emails.send({
      from: EMAIL_FROM,                 // verified sender
      to: CONTACT_TO,                   // your inbox
      subject,
      html: htmlEmail({ ...data, brand }),
      text: textEmail(data),
      replyTo: replyToValue,
      headers: {
        "Reply-To": replyToValue,
        "X-Website-Form": "contact",
      },
    });

    if (res?.error) {
      throw new Error(res.error.message || "Provider rejected the message.");
    }

    return json({ ok: true });
  } catch (err) {
    return json({ error: "Failed to send email.", debug: String(err?.message || err) }, 502);
  }
}
