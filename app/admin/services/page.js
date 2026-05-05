'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ServicesAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/services');
    if (res.ok) setItems((await res.json()).services || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    load();
  }

  async function togglePublished(id, published) {
    await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !published })
    });
    load();
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Services</h1>
          <p style={{ color: 'var(--text-soft)' }}>{items.length} services configured.</p>
        </div>
        <Link href="/admin/services/new" className="btn btn-primary btn-sm">+ New Service</Link>
      </div>

      {loading ? (
        <div className="empty-state">Loading...</div>
      ) : items.length === 0 ? (
        <div className="data-table">
          <div className="empty-state">
            No services in DB yet — public site is showing the default 9 services.{' '}
            <Link href="/admin/services/new" style={{ color: 'var(--primary)', fontWeight: 600 }}>Add a custom one →</Link>
          </div>
        </div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr><th>Title</th><th>Description</th><th>Status</th><th>Order</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s._id}>
                  <td style={{ fontWeight: 600 }}>{s.title}</td>
                  <td className="row-meta" style={{ maxWidth: 360 }}>{s.description?.slice(0, 100)}{s.description?.length > 100 ? '...' : ''}</td>
                  <td>
                    <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 600, background: s.published ? 'rgba(16,185,129,0.12)' : 'rgba(148,163,184,0.15)', color: s.published ? 'var(--success)' : 'var(--text-muted)' }}>
                      {s.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="row-meta">{s.order}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => togglePublished(s._id, s.published)}>
                      {s.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button className="btn btn-ghost btn-sm" style={{ color: '#ef4444' }} onClick={() => remove(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
