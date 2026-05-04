import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Us — Get a Quote | NextGen Digital Hub',
  description: 'Get in touch with NextGen Digital Hub. Request a quote for AI, QA, SaaS, Web, or Mobile development.'
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Get in touch</span>
            <h1>Let's <span className="gradient-text">Build</span> Something Great</h1>
            <p>Tell us about your project — we typically reply within one business day.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="contact-grid">
              <div className="contact-info-card">
                <h3>Talk to us</h3>
                <p className="info-text">Whether it's a new product, a rescue project, or just an idea — we'd love to hear about it.</p>
                {[
                  { label: 'Email', value: 'hello@nextgendigitalhub.com', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg> },
                  { label: 'Phone', value: '+1 (555) 010-2026', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
                  { label: 'Office', value: 'San Francisco, California, USA', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
                  { label: 'Hours', value: 'Mon – Fri, 9am – 6pm PT', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> }
                ].map((r) => (
                  <div className="info-row" key={r.label}>
                    <div className="icon-wrap">{r.icon}</div>
                    <div><div className="label">{r.label}</div><div className="value">{r.value}</div></div>
                  </div>
                ))}
              </div>
              <ContactForm />
            </div>

            <div className="map-placeholder mt-lg" style={{ marginTop: 64 }}>
              <div className="map-pin">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div style={{ position: 'absolute', bottom: 24, background: 'white', padding: '10px 18px', borderRadius: 999, fontSize: '0.85rem', fontWeight: 600, boxShadow: 'var(--shadow)', color: 'var(--text)' }}>
                San Francisco · NextGen HQ
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
