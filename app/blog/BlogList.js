'use client';
import { useState } from 'react';
import Modal from '../components/Modal';

export default function BlogList({ posts }) {
  const [active, setActive] = useState(null);

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
            <div className={`blog-thumb ${p.thumbVariant}`} style={p.coverImage ? { backgroundImage: `url(${p.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
              {!p.coverImage && <span className="topic">{p.topic}</span>}
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

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <>
            {/* Hero thumb */}
            <div className={`blog-thumb ${active.thumbVariant}`} style={{ aspectRatio: '21/8', borderRadius: 0, position: 'relative', ...(active.coverImage ? { backgroundImage: `url(${active.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}) }}>
              {!active.coverImage && <span className="topic" style={{ fontSize: '1.4rem' }}>{active.topic}</span>}
            </div>

            {/* Content */}
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>{active.topic}</span>
                <span>· {active.readTime}</span>
              </div>
              <h2 style={{ marginBottom: 16, lineHeight: 1.3, fontSize: '1.6rem' }}>{active.title}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-soft)', marginBottom: 24, fontStyle: 'italic', borderLeft: '3px solid var(--primary)', paddingLeft: 16 }}>{active.excerpt}</p>

              <div style={{ lineHeight: 1.75, color: 'var(--text)' }}>
                {(active.body || active.fullText || active.excerpt).split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: 16 }}>{para}</p>
                ))}
              </div>

              <div className="modal-cta-box" style={{ marginTop: 32, padding: 24, borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <p style={{ marginBottom: 12, fontWeight: 600, color: 'var(--text)' }}>Want to learn more?</p>
                <a href="/contact" className="btn btn-primary">Get in touch with our team →</a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
