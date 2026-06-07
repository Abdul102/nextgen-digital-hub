'use client';
import { useState } from 'react';
import Modal from '../components/Modal';

function LinkedInBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: '#0a66c2', color: 'white',
      fontSize: '0.68rem', fontWeight: 700,
      padding: '3px 9px', borderRadius: 20,
      letterSpacing: '0.04em',
    }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
      LinkedIn
    </span>
  );
}

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
            <div
              className={`blog-thumb ${p.thumbVariant}`}
              style={p.coverImage ? {
                backgroundImage: `url(${p.coverImage})`,
                backgroundSize: 'cover', backgroundPosition: 'center'
              } : undefined}
            >
              {!p.coverImage && <span className="topic">{p.topic}</span>}
              {p.source === 'linkedin' && (
                <span style={{
                  position: 'absolute', top: 12, right: 12,
                  background: '#0a66c2', borderRadius: 20,
                  padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: '0.7rem', fontWeight: 700, color: 'white',
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </span>
              )}
            </div>

            <div className="blog-info">
              <div className="blog-meta" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="blog-tag">{p.topic}</span>
                <span>· {p.readTime}</span>
                {p.source === 'linkedin' && <LinkedInBadge />}
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
            <div
              className={`blog-thumb ${active.thumbVariant}`}
              style={{
                aspectRatio: '21/8', borderRadius: 0, position: 'relative',
                ...(active.coverImage ? {
                  backgroundImage: `url(${active.coverImage})`,
                  backgroundSize: 'cover', backgroundPosition: 'center'
                } : {})
              }}
            >
              {!active.coverImage && <span className="topic" style={{ fontSize: '1.4rem' }}>{active.topic}</span>}
              {active.source === 'linkedin' && (
                <span style={{
                  position: 'absolute', top: 14, right: 16,
                  background: '#0a66c2', borderRadius: 20,
                  padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.78rem', fontWeight: 700, color: 'white',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  Originally posted on LinkedIn
                </span>
              )}
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{
                  fontWeight: 600, color: 'var(--primary)',
                  textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem'
                }}>{active.topic}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>· {active.readTime}</span>
                {active.source === 'linkedin' && <LinkedInBadge />}
              </div>

              <h2 style={{ marginBottom: 16, lineHeight: 1.3, fontSize: '1.6rem' }}>{active.title}</h2>

              {active.excerpt && (
                <p style={{
                  fontSize: '1.02rem', color: 'var(--text-soft)', marginBottom: 24,
                  fontStyle: 'italic', borderLeft: '3px solid var(--primary)', paddingLeft: 16
                }}>{active.excerpt}</p>
              )}

              <div style={{ lineHeight: 1.8, color: 'var(--text)' }}>
                {(active.body || active.fullText || active.excerpt || '').split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: 16 }}>{para}</p>
                ))}
              </div>

              {active.linkedinUrl && (
                <a
                  href={active.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#0a66c2', color: 'white',
                    padding: '10px 20px', borderRadius: 10,
                    fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
                    marginTop: 8, marginBottom: 24,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  View on LinkedIn →
                </a>
              )}

              <div className="modal-cta-box" style={{ marginTop: 16, padding: 24, borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <p style={{ marginBottom: 12, fontWeight: 600, color: 'var(--text)' }}>Want to connect?</p>
                <a href="/contact" className="btn btn-primary">Get in touch →</a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
