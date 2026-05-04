'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PostsAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/posts');
    if (res.ok) setPosts((await res.json()).posts || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    load();
  }

  async function togglePublished(id, published) {
    await fetch(`/api/posts/${id}`, {
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
          <h1>Blog Posts</h1>
          <p style={{ color: 'var(--text-soft)' }}>{posts.length} posts in your CMS</p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary btn-sm">+ New Post</Link>
      </div>

      {loading ? (
        <div className="empty-state">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="data-table">
          <div className="empty-state">
            No posts yet. <Link href="/admin/posts/new" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create your first post →</Link>
          </div>
        </div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr><th>Title</th><th>Topic</th><th>Status</th><th>Created</th><th></th></tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div className="row-meta">{p.excerpt?.slice(0, 80)}{p.excerpt?.length > 80 ? '...' : ''}</div>
                  </td>
                  <td>{p.topic}</td>
                  <td>
                    <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 600, background: p.published ? 'rgba(16,185,129,0.12)' : 'rgba(148,163,184,0.15)', color: p.published ? 'var(--success)' : 'var(--text-muted)' }}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="row-meta">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => togglePublished(p._id, p.published)}>
                      {p.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button className="btn btn-ghost btn-sm" style={{ color: '#ef4444' }} onClick={() => remove(p._id)}>Delete</button>
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
