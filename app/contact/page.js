export const metadata = { title: "Contact | SNP Photography" };

export default function ContactPage() {
  return (
    <main style={{maxWidth:"1100px", margin:"40px auto", padding:"0 20px"}}>
      <h1>Contact</h1>
      <form name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <p><label>Name<br/><input name="name" required/></label></p>
        <p><label>Email<br/><input type="email" name="email" required/></label></p>
        <p><label>Message<br/><textarea name="message" required rows="6"/></label></p>
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
