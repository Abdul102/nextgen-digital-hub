'use client';
import { useState } from 'react';

export default function CEOImage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="image-card" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 340 }}>
      {!imgError ? (
        <img
          src="/abdul-profile.jpg"
          alt="Abdul Rehman — QA Engineer"
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            display: 'block', borderRadius: 20,
          }}
        />
      ) : (
        /* Stylish fallback until real photo is uploaded */
        <div style={{
          width: '100%', height: '100%', minHeight: 340,
          background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 40%,#06b6d4 100%)',
          borderRadius: 20,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 16,
        }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '3px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', fontWeight: 800, color: 'white',
            fontFamily: 'var(--font-display)',
          }}>AR</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>Abdul Rehman</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: 4 }}>QA Engineer</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', padding: '0 20px' }}>
            {['Playwright','Selenium','AI Testing'].map(t => (
              <span key={t} style={{
                background: 'rgba(255,255,255,0.15)', color: 'white',
                padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.25)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
