'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewServicePage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true); setError('');
    const data = Object.fromEntries(new FormData(e.target));
    data.published = data.published === 'on';
    data.order = parseInt(data.order, 10) || 0;
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) router.push('/admin/services');
    else { const j = await res.json().catch(() => ({})); setError(j.error || 'Failed'); }
    setBusy(false);
  }

  return (
    <>
      <div className="admin-header">
        <h1>New Service</h1>
      </div>

      <div className="form-card" style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" required placeholder="AI Solutions" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" required rows={3} placeholder="Brief description shown on the services page..."></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="icon">Icon style</label>
            <select id="icon" name="icon" defaultValue="circle">
              <option value="circle">Circle / Generic</option>
              <option value="ai">AI / Brain</option>
              <option value="code">Code / Web</option>
              <option value="mobile">Mobile</option>
              <option value="cloud">Cloud</option>
              <option value="shield">QA / Shield</option>
              <option value="chart">Analytics</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="order">Display order (lower = shown first)</label>
            <input id="order" name="order" type="number" defaultValue={0} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <input type="checkbox" name="published" defaultChecked /> Published
          </label>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Saving...' : 'Save Service'}</button>
          {error && <div style={{ color: '#ef4444', marginTop: 12 }}>{error}</div>}
        </form>
      </div>
    </>
  );
}
