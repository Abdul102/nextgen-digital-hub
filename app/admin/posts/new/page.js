'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewPostPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true); setError('');
    const data = Object.fromEntries(new FormData(e.target));
    data.published = data.published === 'on';
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) router.push('/admin/posts');
    else { const j = await res.json().catch(() => ({})); setError(j.error || 'Failed'); }
    setBusy(false);
  }

  return (
    <>
      <div className="admin-header">
        <h1>New Blog Post</h1>
      </div>

      <div className="form-card" style={{ maxWidth: 760 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" required placeholder="How LLMs Are Reshaping Software QA" />
          </div>
          <div className="form-group">
            <label htmlFor="topic">Topic</label>
            <input id="topic" name="topic" defaultValue="Engineering" />
          </div>
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea id="excerpt" name="excerpt" rows={2} placeholder="Short summary..."></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea id="body" name="body" rows={10} required placeholder="Full post content..."></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="readTime">Read time</label>
            <input id="readTime" name="readTime" defaultValue="5 min read" />
          </div>
          <div className="form-group">
            <label htmlFor="thumbVariant">Thumbnail variant</label>
            <select id="thumbVariant" name="thumbVariant" defaultValue="thumb-1">
              <option value="thumb-1">Indigo → Cyan</option>
              <option value="thumb-2">Purple → Pink</option>
              <option value="thumb-3">Cyan → Green</option>
              <option value="thumb-4">Amber → Red</option>
              <option value="thumb-5">Indigo → Purple</option>
              <option value="thumb-6">Sky → Indigo</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <input type="checkbox" name="published" defaultChecked /> Published
          </label>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Saving...' : 'Save Post'}</button>
          {error && <div style={{ color: '#ef4444', marginTop: 12 }}>{error}</div>}
        </form>
      </div>
    </>
  );
}
