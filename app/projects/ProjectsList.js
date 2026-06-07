'use client';
import { useState } from 'react';

const LABEL_STYLE = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#4f46e5',
  marginBottom: 6,
};

const SECTION_TEXT = {
  fontSize: '0.92rem',
  color: 'var(--text-soft, #475569)',
  lineHeight: 1.7,
  marginBottom: 24,
  fontFamily: 'var(--font-sans)',
  fontWeight: 400,
};

export default function ProjectsList({ projects }) {
  const [active, setActive] = useState(null);
  const [mode, setMode] = useState('case-study');

  function openProject(p, m = 'case-study') { setActive(p); setMode(m); }
  function close() { setActive(null); setMode('case-study'); }

  return (
    <>
      {/* ── Grid ── */}
      <div className="grid grid-3">
        {projects.map((p) => (
          <div key={p.name} className="project-card" style={{ cursor: 'default' }}>
            <div
              className={`project-thumb ${p.thumb}`}
              style={{
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                ...(p.previewImg ? { background: 'none' } : {})
              }}
              onClick={() => openProject(p)}
            >
              {p.previewImg && (
                <img
                  src={p.previewImg}
                  alt={p.name}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top left',
                    display: 'block',
                  }}
                />
              )}
              {/* dark overlay for readability */}
              {p.previewImg && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                }}/>
              )}
              {!p.previewImg && <span className="badge">{p.cat}</span>}
              <span className="label" style={{ position: 'absolute', bottom: 14, left: 16, zIndex: 2 }}>{p.name}</span>
              {p.demoUrl && (
                <span style={{
                  position: 'absolute', top: 10, left: 10, zIndex: 2,
                  background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                  color: '#fff', fontSize: '10px', fontWeight: 700,
                  padding: '3px 10px', borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>● LIVE DEMO</span>
              )}
              {p.previewImg && (
                <span style={{
                  position: 'absolute', top: 10, right: 10, zIndex: 2,
                  background: 'rgba(79,70,229,0.75)', backdropFilter: 'blur(6px)',
                  color: '#fff', fontSize: '9px', fontWeight: 700,
                  padding: '3px 9px', borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>{p.cat}</span>
              )}
            </div>

            <div className="project-info">
              <h3 style={{ marginBottom: 8, fontSize: '1.05rem', color: 'var(--text, #0f172a)', background: 'none', WebkitTextFillColor: 'unset' }}>
                {p.name}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-soft)', marginBottom: 14, lineHeight: 1.55 }}>{p.desc}</p>
              <div className="tech-stack" style={{ marginBottom: 16 }}>
                {p.stack.map((t) => <span key={t} className="tech">{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => openProject(p, 'case-study')} className="btn-card-outline">
                  Case Study →
                </button>
                {p.demoUrl && (
                  <button onClick={() => openProject(p, 'prototype')} className="btn-card-primary">
                    ▶ Launch Prototype
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal ── */}
      {active && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div style={{
            background: 'var(--bg, #fff)',
            borderRadius: 20,
            width: '100%',
            maxWidth: mode === 'prototype' ? 1080 : 700,
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
          }}>

            {/* ── Modal top bar ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 18px',
              borderBottom: '1px solid var(--border, #e2e8f0)',
              flexShrink: 0,
              background: 'var(--bg, #fff)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontWeight: 700, fontSize: 14,
                  color: 'var(--text, #0f172a)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>{active.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted, #94a3b8)', marginTop: 1 }}>{active.cat}</div>
              </div>

              {/* Tabs */}
              <div style={{
                display: 'flex', gap: 3,
                background: 'var(--bg-soft, #f8fafc)',
                borderRadius: 10, padding: 3,
                border: '1px solid var(--border, #e2e8f0)',
              }}>
                <button
                  onClick={() => setMode('case-study')}
                  style={{
                    padding: '6px 14px', borderRadius: 7, border: 'none',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    background: mode === 'case-study' ? 'var(--bg)' : 'transparent',
                    color: mode === 'case-study' ? 'var(--text)' : 'var(--text-muted)',
                    boxShadow: mode === 'case-study' ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
                    transition: 'all .15s',
                  }}
                >📋 Case Study</button>

                {active.demoUrl && (
                  <button
                    onClick={() => setMode('prototype')}
                    style={{
                      padding: '6px 14px', borderRadius: 7, border: 'none',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      background: mode === 'prototype'
                        ? 'linear-gradient(135deg,#4f46e5,#06b6d4)'
                        : 'transparent',
                      color: mode === 'prototype' ? '#fff' : '#94a3b8',
                      boxShadow: mode === 'prototype' ? '0 2px 8px rgba(79,70,229,.35)' : 'none',
                      transition: 'all .15s',
                    }}
                  >▶ Live Prototype</button>
                )}
              </div>

              {/* Close */}
              <button
                onClick={close}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  border: '1px solid var(--border, #e2e8f0)',
                  background: 'var(--bg-soft, #f8fafc)',
                  color: 'var(--text-soft, #475569)',
                  cursor: 'pointer', fontSize: 15, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>
            </div>

            {/* ── Modal body ── */}
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              {mode === 'prototype' && active.demoUrl ? (
                <iframe
                  src={active.demoUrl}
                  style={{ width: '100%', flex: 1, border: 'none', minHeight: 560, display: 'block' }}
                  title={`${active.name} prototype`}
                />
              ) : (
                <div style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>

                  {/* Thumb banner */}
                  <div
                    className={`project-thumb ${active.thumb}`}
                    style={{
                      borderRadius: 0, minHeight: 160, position: 'relative', overflow: 'hidden',
                      ...(active.previewImg ? { background: 'none' } : {})
                    }}
                  >
                    {active.previewImg && (
                      <img src={active.previewImg} alt={active.name} style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'top left',
                      }}/>
                    )}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)'
                    }} />
                    <span style={{
                      position: 'absolute', top: 16, left: 20,
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff', fontSize: 11, fontWeight: 700,
                      padding: '3px 11px', borderRadius: 20,
                      letterSpacing: '0.07em', textTransform: 'uppercase',
                    }}>{active.cat}</span>
                    <span style={{
                      position: 'absolute', bottom: 20, left: 20,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.7rem', fontWeight: 800,
                      color: '#fff',
                      textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    }}>{active.name}</span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '28px 28px 32px' }}>

                    {/* Stack pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
                      {active.stack.map((t) => (
                        <span key={t} style={{
                          fontSize: 11, fontWeight: 600,
                          padding: '4px 11px', borderRadius: 20,
                          background: 'rgba(79,70,229,0.08)',
                          color: '#4f46e5',
                          border: '1px solid rgba(79,70,229,0.18)',
                        }}>{t}</span>
                      ))}
                    </div>

                    {/* Overview */}
                    <span style={LABEL_STYLE}>Overview</span>
                    <p style={SECTION_TEXT}>{active.desc}</p>

                    {/* Challenge */}
                    {active.challenge && (
                      <>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
                        }}>
                          <span style={{
                            width: 28, height: 28, borderRadius: 8,
                            background: 'rgba(239,68,68,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14, flexShrink: 0,
                          }}>⚡</span>
                          <span style={{ ...LABEL_STYLE, marginBottom: 0, color: '#dc2626' }}>Challenge</span>
                        </div>
                        <p style={SECTION_TEXT}>{active.challenge}</p>
                      </>
                    )}

                    {/* Solution */}
                    {active.solution && (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{
                            width: 28, height: 28, borderRadius: 8,
                            background: 'rgba(79,70,229,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14, flexShrink: 0,
                          }}>🔧</span>
                          <span style={{ ...LABEL_STYLE, marginBottom: 0 }}>Solution</span>
                        </div>
                        <p style={SECTION_TEXT}>{active.solution}</p>
                      </>
                    )}

                    {/* Results */}
                    {active.results?.length > 0 && (
                      <>
                        <span style={LABEL_STYLE}>Results</span>
                        <div style={{
                          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                          gap: 12, marginBottom: 28,
                        }}>
                          {active.results.map((r, i) => (
                            <div key={i} style={{
                              padding: '18px 12px', borderRadius: 14, textAlign: 'center',
                              background: 'linear-gradient(135deg,rgba(79,70,229,0.06),rgba(6,182,212,0.06))',
                              border: '1px solid rgba(79,70,229,0.14)',
                            }}>
                              <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.35rem', fontWeight: 800,
                                background: 'linear-gradient(135deg,#4f46e5,#06b6d4)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: 5,
                              }}>{r.value}</div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted, #94a3b8)', fontWeight: 500 }}>{r.label}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* CTA buttons */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {active.demoUrl && (
                        <button
                          onClick={() => setMode('prototype')}
                          style={{
                            flex: 1, minWidth: 180,
                            background: 'linear-gradient(135deg,#4f46e5,#06b6d4)',
                            color: '#fff', border: 'none',
                            padding: '12px 20px', borderRadius: 12,
                            fontSize: 13, fontWeight: 700, cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(79,70,229,0.3)',
                          }}
                        >▶ Launch Interactive Prototype</button>
                      )}
                      <a href="/contact" style={{
                        flex: 1, minWidth: 160,
                        display: 'block', textAlign: 'center',
                        padding: '12px 20px', borderRadius: 12,
                        border: '1.5px solid var(--border, #e2e8f0)',
                        color: 'var(--text-soft, #475569)',
                        fontSize: 13, fontWeight: 600,
                        textDecoration: 'none',
                        background: 'var(--bg-soft, #f8fafc)',
                      }}>Discuss a similar project →</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .btn-card-outline {
          background: transparent;
          border: 1.5px solid var(--border, #e2e8f0);
          color: var(--text-soft, #475569);
          padding: 7px 15px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all .15s;
        }
        .btn-card-outline:hover {
          border-color: #4f46e5;
          color: #4f46e5;
        }
        .btn-card-primary {
          background: linear-gradient(135deg,#4f46e5,#06b6d4);
          border: none;
          color: #fff;
          padding: 7px 15px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(79,70,229,0.28);
          transition: opacity .15s;
        }
        .btn-card-primary:hover { opacity: 0.88; }
      `}</style>
    </>
  );
}
