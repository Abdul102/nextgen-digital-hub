'use client';
import { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const videoRef  = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false); // set after sessionStorage check
  const [ended,       setEnded]       = useState(false);
  const [muted,       setMuted]       = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Show overlay only once per browser session
    const seen = sessionStorage.getItem('hero_entered');
    if (seen) {
      // Already visited — play muted silently, no overlay
      v.muted = true;
      v.loop  = false;
      v.play().catch(() => {});
    } else {
      // First visit this session — show overlay
      setShowOverlay(true);
      v.muted = true;
      v.loop  = false;
      v.play().catch(() => {});
      v.pause();
      v.currentTime = 0;
    }

    v.addEventListener('ended', () => { setEnded(true); });
  }, []);

  function handleEnter() {
    const v = videoRef.current;
    if (!v) return;
    setShowOverlay(false);
    sessionStorage.setItem('hero_entered', '1'); // remember for this session
    v.muted       = false;
    v.volume      = 1;
    v.currentTime = 0;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <>
      <video
        ref={videoRef}
        className="hero-bg-iframe"
        src="/hero-eye.mp4"
        playsInline
        preload="auto"
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
      />

      {/* ── Click-to-Enter overlay ── */}
      {showOverlay && (
        <div
          onClick={handleEnter}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: 'rgba(4,6,15,0.88)',
            backdropFilter: 'blur(3px)',
          }}
        >
          {/* Top badge */}
          <div style={{
            background: 'rgba(79,70,229,0.15)',
            border: '1px solid rgba(79,70,229,0.4)',
            borderRadius: 999,
            padding: '6px 20px',
            marginBottom: 28,
            animation: 'fadeSlideDown 0.8s ease both',
          }}>
            <span style={{
              color: '#a5b4fc',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}>Abdul Rehman &mdash; QA Engineer</span>
          </div>

          {/* Headline */}
          <h2 style={{
            color: '#fff',
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.2,
            margin: '0 0 10px',
            fontFamily: 'var(--font-display, sans-serif)',
            animation: 'fadeSlideDown 0.9s 0.1s ease both',
          }}>
            Ready to Meet<br/>
            <span style={{
              background: 'linear-gradient(135deg,#a5b4fc,#06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Abdul Rehman?</span>
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.9rem',
            textAlign: 'center',
            margin: '0 0 44px',
            animation: 'fadeSlideDown 1s 0.2s ease both',
          }}>Quality Engineering &bull; AI Testing &bull; Automation</p>

          {/* Enter button */}
          <div style={{
            position: 'relative',
            animation: 'fadeSlideDown 1s 0.3s ease both',
          }}>
            {/* outer pulse rings */}
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              border: '1.5px solid rgba(79,70,229,0.3)',
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
            }}/>
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              border: '1.5px solid rgba(6,182,212,0.25)',
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              animation: 'ping 2s 0.6s cubic-bezier(0,0,0.2,1) infinite',
            }}/>

            {/* main button */}
            <div style={{
              width: 78, height: 78, borderRadius: '50%',
              background: 'linear-gradient(135deg,#4f46e5,#06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(79,70,229,0.55), 0 0 80px rgba(6,182,212,0.2)',
              transition: 'transform .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            >
              {/* Door/Enter arrow icon */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </div>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.72rem',
            marginTop: 28,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            animation: 'fadeSlideDown 1s 0.4s ease both',
          }}>Click anywhere to enter</p>
        </div>
      )}

      {/* ── Sound toggle (after overlay dismissed, video not ended) ── */}
      {!showOverlay && !ended && (
        <button
          onClick={toggleMute}
          title={muted ? 'Sound on' : 'Sound off'}
          style={{
            position: 'absolute',
            bottom: 28, right: 28,
            zIndex: 10,
            width: 40, height: 40,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.2)',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>
      )}

      <style>{`
        @keyframes ping {
          0%   { transform: translate(-50%,-50%) scale(1); opacity:.6; }
          100% { transform: translate(-50%,-50%) scale(2.2); opacity:0; }
        }
        @keyframes fadeSlideDown {
          from { opacity:0; transform: translateY(-16px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
