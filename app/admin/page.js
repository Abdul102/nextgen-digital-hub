'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ messages: 0, unread: 0, posts: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/messages').then((r) => (r.ok ? r.json() : { items: [] })),
      fetch('/api/posts').then((r) => (r.ok ? r.json() : { posts: [] }))
    ]).then(([m, p]) => {
      const items = m?.items || [];
      setStats({
        messages: items.length,
        unread: items.filter((x) => !x.read).length,
        posts: (p?.posts || []).length
      });
    });
  }, []);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--text-soft)' }}>Overview of your site activity.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Total Messages</div>
          <div className="num">{stats.messages}</div>
        </div>
        <div className="stat-card">
          <div className="label">Unread Messages</div>
          <div className="num">{stats.unread}</div>
        </div>
        <div className="stat-card">
          <div className="label">Blog Posts</div>
          <div className="num">{stats.posts}</div>
        </div>
      </div>

      <div className="grid grid-2" style={{ gap: 20 }}>
        <Link href="/admin/messages" className="card" style={{ textDecoration: 'none' }}>
          <div className="card-icon">📬</div>
          <h3>Messages</h3>
          <p>View and manage contact form submissions in real time.</p>
        </Link>
        <Link href="/admin/posts" className="card" style={{ textDecoration: 'none' }}>
          <div className="card-icon">📝</div>
          <h3>Blog Posts</h3>
          <p>Create, edit, and publish blog content.</p>
        </Link>
      </div>
    </>
  );
}
