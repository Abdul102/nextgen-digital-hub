'use client';
import { useEffect, useState } from 'react';

export default function MessagesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/messages');
    if (res.ok) setItems((await res.json()).items || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  // Live updates via Pusher (also handled in shell, but here we refresh the list)
  useEffect(() => {
    let pusher, channel;
    async function setup() {
      const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
      const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
      if (!key || !cluster) return;
      const Pusher = (await import('pusher-js')).default;
      pusher = new Pusher(key, { cluster });
      channel = pusher.subscribe('admin-channel');
      channel.bind('new-message', () => load());
    }
    setup();
    return () => {
      if (channel) channel.unbind_all();
      if (pusher) pusher.disconnect();
    };
  }, []);

  async function toggleRead(id, read) {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !read })
    });
    load();
  }

  async function remove(id) {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    setActive(null);
    load();
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Messages</h1>
          <p style={{ color: 'var(--text-soft)' }}>{items.length} total · live updates enabled</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={load}>↻ Refresh</button>
      </div>

      {loading ? (
        <div className="empty-state">Loading...</div>
      ) : items.length === 0 ? (
        <div className="data-table"><div className="empty-state">No messages yet. When someone submits the contact form, it will appear here in real time.</div></div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr><th></th><th>Name / Email</th><th>Service</th><th>Message</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m._id} style={{ opacity: m.read ? 0.7 : 1 }}>
                  <td>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: m.read ? 'var(--text-muted)' : 'var(--primary)' }}></span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                    <div className="row-meta">{m.email}</div>
                  </td>
                  <td>{m.service}</td>
                  <td style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => setActive(m)}>
                    {m.message}
                  </td>
                  <td className="row-meta">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => toggleRead(m._id, m.read)}>{m.read ? 'Unread' : 'Read'}</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => remove(m._id)} style={{ color: '#ef4444' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active && (
        <div onClick={() => setActive(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', display: 'grid', placeItems: 'center', padding: 20, zIndex: 100 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 32, maxWidth: 560, width: '100%', boxShadow: 'var(--shadow-xl)' }}>
            <h3>{active.name}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>{active.email} · {active.service}</p>
            <p style={{ marginBottom: 24 }}>{active.message}</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-outline btn-sm" onClick={() => setActive(null)}>Close</button>
              <a className="btn btn-primary btn-sm" href={`mailto:${active.email}?subject=Re: Your inquiry`}>Reply by email</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
