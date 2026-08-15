import { useState } from "react";
import Tape from "../components/Tape";
import Polaroid from "../components/Polaroid";
import { site } from "../siteConfig";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <section className="container page-header-inner">
        <p className="eyebrow">Let's Talk</p>
        <h1 className="hand page-title">Contact Me</h1>
      </section>

      <section className="container contact-section">
        <div className="contact-grid">
          <div className="contact-side">
            <div className="about-photo-wrap">
              <Polaroid seed="contact-portrait" rotate={-3} />
              <div className="name-tag">
                <p className="hello">Say hi to</p>
                <p className="name">{site.name}</p>
              </div>
              <Tape pattern="check" rotate={12} style={{ top: -16, right: -6 }} />
            </div>

            <div className="torn-paper contact-info-card">
              <ul className="contact-info">
                <li>
                  <span className="contact-label">Phone</span>
                  <span>{site.phone}</span>
                </li>
                <li>
                  <span className="contact-label">Website</span>
                  <span>{site.website}</span>
                </li>
                <li>
                  <span className="contact-label">Email</span>
                  <span>{site.email}</span>
                </li>
                <li>
                  <span className="contact-label">Location</span>
                  <span>{site.location}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="torn-wrap contact-form-wrap">
            <Tape pattern="dot" rotate={-10} style={{ top: -16, right: 60 }} />
            <form className="torn-paper contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" required value={form.name} onChange={handleChange} />
            </label>
            <label>
              Email
              <input type="email" name="email" required value={form.email} onChange={handleChange} />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required value={form.message} onChange={handleChange} />
            </label>
            <button type="submit" className="btn">
              Send Message
            </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
