'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setSuccess(false);
    setError('');
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setSuccess(true);
        e.target.reset();
        setTimeout(() => setSuccess(false), 6000);
      } else {
        const j = await res.json().catch(() => ({}));
        setError(j.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error. Please email us directly.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="form-card">
      <h3 className="mb">Send us a message</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full name</label>
          <input type="text" id="name" name="name" placeholder="Jane Doe" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" placeholder="jane@company.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service interested in</label>
          <select id="service" name="service" defaultValue="AI Solutions">
            <option>AI Solutions</option>
            <option>QA & Software Testing</option>
            <option>SaaS Development</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>Cloud Applications</option>
            <option>Business Analytics</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Tell us about your project..." required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={busy}>
          {busy ? 'Sending...' : 'Send Message →'}
        </button>
        {success && <div className="form-success show">Thanks! We'll be in touch within one business day.</div>}
        {error && <div style={{ display: 'block', padding: '14px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius)', color: '#ef4444', fontSize: '0.9rem', fontWeight: 500, marginTop: 16 }}>{error}</div>}
      </form>
    </div>
  );
}
