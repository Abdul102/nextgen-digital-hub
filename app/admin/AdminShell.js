'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/messages', label: 'Messages', icon: '💬' },
  { href: '/admin/posts', label: 'Blog Posts', icon: '📝' }
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [toast, setToast] = useState(null);

  // Hide shell entirely on the login page
  if (pathname === '/admin/login') return children;

  // Live notifications via Pusher
  useEffect(() => {
    let pusher, channel;
    let cancelled = false;
    async function setup() {
      if (typeof window === 'undefined') return;
      const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
      const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
      if (!key || !cluster) return;
      const Pusher = (await import('pusher-js')).default;
      if (cancelled) return;
      pusher = new Pusher(key, { cluster });
      channel = pusher.subscribe('admin-channel');
      channel.bind('new-message', (data) => {
        setToast({ name: data?.name || 'Someone', service: data?.service || '' });
        setTimeout(() => setToast(null), 5000);
        // Optional: simple beep
        try { new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=').play(); } catch {}
      });
    }
    setup();
    return () => {
      cancelled = true;
      if (channel) channel.unbind_all();
      if (pusher) pusher.disconnect();
    };
  }, []);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="logo">
          <span className="logo-mark">N</span>
          <span style={{ color: 'white' }}>NextGen Admin</span>
        </Link>
        <nav>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={pathname === n.href ? 'active' : ''}>
              <span>{n.icon}</span> {n.label}
            </Link>
          ))}
          <Link href="/" target="_blank">🌐 View Site</Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            style={{ padding: '10px 14px', borderRadius: 'var(--radius)', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 500, fontSize: '0.9rem', marginTop: 16 }}
          >
            🚪 Sign out
          </button>
        </nav>
        {status === 'authenticated' && (
          <div style={{ marginTop: 32, padding: '12px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', fontSize: '0.8rem' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)' }}>Signed in as</div>
            <div style={{ color: 'white', fontWeight: 600 }}>{session.user?.email}</div>
          </div>
        )}
      </aside>
      <div className="admin-main">{children}</div>
      <div className={`live-toast ${toast ? 'show' : ''}`}>
        {toast && (
          <>
            <strong>📬 New message from {toast.name}</strong>
            <p>About: {toast.service}</p>
          </>
        )}
      </div>
    </div>
  );
}
