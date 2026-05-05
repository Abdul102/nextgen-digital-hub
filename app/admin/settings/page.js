'use client';
import { useEffect, useRef, useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await fetch('/api/settings');
    if (res.ok) setSettings((await res.json()).settings || {});
  }

  function update(field, value) {
    setSettings((s) => ({ ...s, [field]: value }));
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      setError('Image must be smaller than 3 MB. Try compressing it first.');
      return;
    }

    // Resize + convert to base64 in browser (cap at 800px wide)
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const img = new Image();
      img.onload = () => {
        const max = 800;
        const ratio = Math.min(max / img.width, max / img.height, 1);
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        update('ceoPhoto', dataUrl);
        setError('');
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  async function save() {
    setBusy(true); setSuccess(false); setError('');
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    setBusy(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j.error || 'Failed to save');
    }
  }

  if (!settings) return <div className="empty-state">Loading...</div>;

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Site Settings</h1>
          <p style={{ color: 'var(--text-soft)' }}>CEO profile and contact info — shown across the public site.</p>
        </div>
      </div>

      <div className="form-card" style={{ maxWidth: 720 }}>
        <h3 className="mb">CEO / Founder</h3>

        <div className="form-group">
          <label>Photo</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
            <div style={{ width: 80, height: 100, borderRadius: 12, background: settings.ceoPhoto ? `url(${settings.ceoPhoto})` : 'var(--gradient-primary)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'grid', placeItems: 'center', color: 'white', fontWeight: 700, fontSize: '1.5rem', border: '1px solid var(--border)', flexShrink: 0 }}>
              {!settings.ceoPhoto && 'AR'}
            </div>
            <div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
              <button type="button" className="btn btn-outline btn-sm" onClick={() => fileRef.current?.click()}>
                {settings.ceoPhoto ? 'Replace photo' : 'Upload photo'}
              </button>
              {settings.ceoPhoto && (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => update('ceoPhoto', '')} style={{ marginLeft: 8, color: '#ef4444' }}>Remove</button>
              )}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>JPG / PNG · auto-resized · max 3 MB</p>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ceoName">Name</label>
          <input id="ceoName" value={settings.ceoName || ''} onChange={(e) => update('ceoName', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="ceoTitle">Title</label>
          <input id="ceoTitle" value={settings.ceoTitle || ''} onChange={(e) => update('ceoTitle', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="ceoBio">Short bio</label>
          <textarea id="ceoBio" rows={4} value={settings.ceoBio || ''} onChange={(e) => update('ceoBio', e.target.value)} />
        </div>

        <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '24px 0' }} />
        <h3 className="mb">Public Contact Info</h3>

        <div className="form-group">
          <label htmlFor="contactEmail">Email</label>
          <input id="contactEmail" type="email" value={settings.contactEmail || ''} onChange={(e) => update('contactEmail', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="contactPhone">Phone</label>
          <input id="contactPhone" value={settings.contactPhone || ''} onChange={(e) => update('contactPhone', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="contactCity">City / Office</label>
          <input id="contactCity" value={settings.contactCity || ''} onChange={(e) => update('contactCity', e.target.value)} />
        </div>

        <button className="btn btn-primary" onClick={save} disabled={busy}>
          {busy ? 'Saving...' : 'Save Settings'}
        </button>
        {success && <span style={{ marginLeft: 16, color: 'var(--success)', fontWeight: 500 }}>Saved!</span>}
        {error && <div style={{ color: '#ef4444', marginTop: 12 }}>{error}</div>}
      </div>
    </>
  );
}
