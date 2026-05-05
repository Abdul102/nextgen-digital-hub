'use client';
import { useState } from 'react';
import Modal from '../components/Modal';

export default function ProjectsList({ projects }) {
  const [active, setActive] = useState(null);

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

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <>
            {/* Hero thumb */}
            <div className={`project-thumb ${active.thumb}`} style={{ aspectRatio: '21/8', borderRadius: 0 }}>
              <span style={{
                position: 'absolute', bottom: 24, left: 24,
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem', fontWeight: 500,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.04em', textTransform: 'uppercase'
              }}>{active.cat}</span>
              <span className="label" style={{ fontSize: '2rem', bottom: 50 }}>{active.name}</span>
            </div>

            {/* Content */}
            <div style={{ padding: '32px' }}>
              <h2 style={{ marginBottom: 24, fontSize: '1.6rem' }}>{active.name}</h2>

              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: 8 }}>Overview</h3>
              <p style={{ marginBottom: 24 }}>{active.desc}</p>

              {active.challenge && (<>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: 8 }}>Challenge</h3>
                <p style={{ marginBottom: 24 }}>{active.challenge}</p>
              </>)}

              {active.solution && (<>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: 8 }}>Solution</h3>
                <p style={{ marginBottom: 24 }}>{active.solution}</p>
              </>)}

              {active.results?.length > 0 && (<>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: 12 }}>Results</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
                  {active.results.map((r, i) => (
                    <div key={i} style={{ background: 'var(--bg-soft)', padding: 16, borderRadius: 'var(--radius)', textAlign: 'center', border: '1px solid var(--border)' }}>
                      <div className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 4 }}>{r.value}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.label}</div>
                    </div>
                  ))}
                </div>
              </>)}

              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: 12 }}>Tech Stack</h3>
              <div className="tech-stack" style={{ marginBottom: 28 }}>
                {active.stack.map((t) => <span key={t} className="tech">{t}</span>)}
              </div>

              <a href="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                Discuss a similar project →
              </a>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
