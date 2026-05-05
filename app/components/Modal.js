'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Reusable Modal that renders to document.body via portal.
 * Bypasses ALL parent stacking contexts (transforms, overflow, etc.)
 * so the close button and content are guaranteed visible.
 */
export default function Modal({ open, onClose, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15, 23, 42, 0.78)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 2147483647, // max safe z-index
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
        style={{
          background: 'var(--white)',
          color: 'var(--text)',
          borderRadius: 20,
          maxWidth: 760,
          width: '100%',
          boxShadow: '0 25px 80px -10px rgba(0, 0, 0, 0.6)',
          margin: 'auto',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--border)'
        }}
      >
        {/* Floating close button — always visible at top right */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="modal-close-btn"
          style={{
            position: 'absolute',
            top: 16, right: 16,
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--white)',
            border: '1px solid var(--border)',
            display: 'grid', placeItems: 'center',
            cursor: 'pointer', color: 'var(--text)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ pointerEvents: 'none' }}>
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
