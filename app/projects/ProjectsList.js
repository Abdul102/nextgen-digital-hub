'use client';
import { useState, useEffect } from 'react';

export default function ProjectsList({ projects }) {
  const [active, setActive] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <>
      <div className="grid grid-3">
        {projects.map((p) => (
          <div
            key={p.name}
            className="project-card"
            onClick={() => setActive(p)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setActive(p); }}
          >
            <div className={`project-thumb ${p.thumb}`}>
              <span className="badge">{p.cat}</span>
              <span className="label">{p.name}</span>
            </div>
            <div className="project-info">
              <h3>{p.name} — {p.cat}</h3>
              <p>{p.desc}</p>
              <div className="tech-stack">
                {p.stack.map((t) => <span key={t} className="tech">{t}</span>)}
              </div>
              <span className="read-more" style={{ marginTop: 12, display: 'inline-block' }}>
                View case study →
              </span>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)',
            padding: 20, zIndex: 10000,
            backdropFilter: 'blur(4px)',
            overflowY: 'auto', display: 'flex', alignItems: 'flex-start',
            justifyContent: 'center', paddingTop: 'max(40px, 5vh)',
            paddingBottom: 'max(40px, 5vh)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: 'var(--radius-lg)',
              maxWidth: 720, width: '100%',
              boxShadow: 'var(--shadow-xl)',
              margin: 'auto', position: 'relative'
            }}
          >
            <div className={`project-thumb ${active.thumb}`} style={{ aspectRatio: '21/9' }}>
              <span className="badge">{active.cat}</span>
              <span className="label">{active.name}</span>
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
              <h2 style={{ marginBottom: 6 }}>{active.name}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>{active.cat}</p>

              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', marginBottom: 8 }}>Overview</h3>
              <p style={{ marginBottom: 24 }}>{active.desc}</p>

              {active.challenge && (<>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', marginBottom: 8 }}>Challenge</h3>
                <p style={{ marginBottom: 24 }}>{active.challenge}</p>
              </>)}

              {active.solution && (<>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', marginBottom: 8 }}>Solution</h3>
                <p style={{ marginBottom: 24 }}>{active.solution}</p>
              </>)}

              {active.results?.length > 0 && (<>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', marginBottom: 12 }}>Results</h3>
                <div className="grid grid-3" style={{ gap: 12, marginBottom: 24 }}>
                  {active.results.map((r, i) => (
                    <div key={i} style={{ background: 'var(--bg-soft)', padding: 16, borderRadius: 'var(--radius)', textAlign: 'center' }}>
                      <div className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700 }}>{r.value}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{r.label}</div>
                    </div>
                  ))}
                </div>
              </>)}

              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', marginBottom: 12 }}>Tech Stack</h3>
              <div className="tech-stack" style={{ marginBottom: 24 }}>
                {active.stack.map((t) => <span key={t} className="tech">{t}</span>)}
              </div>

              <a href="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                Discuss a similar project →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
