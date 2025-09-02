"use client";

export default function ContactPage() {
  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fd).toString(),
    });
    alert("Thanks! Your message was sent.");
    e.currentTarget.reset();
  }

  return (
    <main>
      <h1>Contact</h1>
      <form name="contact" onSubmit={onSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <p><label>Name<br/><input name="name" required /></label></p>
        <p><label>Email<br/><input type="email" name="email" required /></label></p>
        <p><label>Message<br/><textarea name="message" rows="6" required /></label></p>
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
