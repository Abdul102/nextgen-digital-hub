'use client';
import { useState, useEffect } from 'react';

export default function BlogList({ posts }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <>
      <div className="grid grid-3">
        {posts.map((p) => (
          <article
            key={p._id}
            className="blog-card"
            onClick={() => setActive(p)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setActive(p); }}
          >
            <div className={`blog-thumb ${p.thumbVariant}`}>
              <span className="topic">{p.topic}</span>
            </div>
            <div className="blog-info">
              <div className="blog-meta">
                <span className="blog-tag">{p.topic}</span>
                <span>· {p.readTime}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="read-more">Read more →</span>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)',
            display: 'grid', placeItems: 'center', padding: 20, zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: 'var(--radius-lg)',
              maxWidth: 720, width: '100%', maxHeight: '90vh', overflow: 'auto',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div className={`blog-thumb ${active.thumbVariant}`} style={{ aspectRatio: '21/9', position: 'relative' }}>
              <span className="topic">{active.topic}</span>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)', display: 'grid', placeItems: 'center',
                  border: 'none', cursor: 'pointer', color: 'var(--text)', zIndex: 2
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div style={{ padding: 32 }}>
              <div className="blog-meta" style={{ marginBottom: 16 }}>
                <span className="blog-tag">{active.topic}</span>
                <span>· {active.readTime}</span>
              </div>
              <h2 style={{ marginBottom: 16, lineHeight: 1.3 }}>{active.title}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-soft)', marginBottom: 24, fontStyle: 'italic' }}>{active.excerpt}</p>

              <div style={{ lineHeight: 1.7, color: 'var(--text)' }}>
                {(active.body || active.fullText || active.excerpt).split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: 16 }}>{para}</p>
                ))}
              </div>

              <div style={{ marginTop: 32, padding: 24, background: 'var(--bg-soft)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                <p style={{ marginBottom: 12, fontWeight: 600 }}>Want to learn more?</p>
                <a href="/contact" className="btn btn-primary">Get in touch with our team →</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
