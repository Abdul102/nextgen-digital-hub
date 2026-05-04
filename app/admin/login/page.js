'use client';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setBusy(false);
    if (res?.ok) {
      router.push(params.get('callbackUrl') || '/admin');
    } else {
      setError('Invalid email or password.');
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: 14, background: 'var(--gradient-primary)', display: 'grid', placeItems: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>N</div>
          <h2 style={{ marginBottom: 6 }}>Admin Sign In</h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-soft)' }}>Sign in to manage messages and blog posts.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nextgendigitalhub.com"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={busy}>
            {busy ? 'Signing in...' : 'Sign In'}
          </button>
          {error && (
            <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius)', color: '#ef4444', fontSize: '0.88rem' }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
