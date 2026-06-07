'use client';
import { useState } from 'react';

export default function LinkedInImportPage() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'ok' | 'error'
  const [msg, setMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const webhookUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/linkedin-webhook`
    : '/api/linkedin-webhook';

  async function handleImport(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus('loading');
    setMsg('');
    try {
      const res = await fetch('/api/linkedin-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          url: url.trim(),
          secret: process.env.NEXT_PUBLIC_LINKEDIN_WEBHOOK_SECRET || '',
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('ok');
        setMsg(data.skipped ? 'Already imported before — skipped.' : 'Post saved to blog!');
        setText('');
        setUrl('');
      } else {
        setStatus('error');
        setMsg(data.error || 'Something went wrong');
      }
    } catch (e) {
      setStatus('error');
      setMsg(String(e.message));
    }
  }

  function copyWebhook() {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 20px' }}>

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>
          LinkedIn → Blog Sync
        </h1>
        <p style={{ color: 'var(--text-soft)', fontSize: '0.92rem' }}>
          Import LinkedIn posts to your blog — manually or fully automatically via Zapier.
        </p>
      </div>

      {/* ── Manual Import ── */}
      <div style={{
        background: 'var(--bg-soft)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 28, marginBottom: 28
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Manual Import</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Paste your LinkedIn post and save it to the blog instantly</div>
          </div>
        </div>

        <form onSubmit={handleImport}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-soft)' }}>
              LinkedIn Post Text *
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your LinkedIn post text here...&#10;&#10;e.g. 🚀 Excited to share that I just built a self-healing test framework using Playwright + AI..."
              rows={8}
              style={{
                width: '100%', padding: '12px 14px',
                borderRadius: 10, border: '1.5px solid var(--border)',
                background: 'var(--bg)', color: 'var(--text)',
                fontSize: '0.9rem', lineHeight: 1.6, resize: 'vertical',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
              }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
              {text.length} characters · ~{Math.max(1, Math.round(text.split(/\s+/).length / 200))} min read
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-soft)' }}>
              LinkedIn Post URL (optional)
            </label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://www.linkedin.com/feed/update/..."
              style={{
                width: '100%', padding: '10px 14px',
                borderRadius: 10, border: '1.5px solid var(--border)',
                background: 'var(--bg)', color: 'var(--text)',
                fontSize: '0.9rem', fontFamily: 'var(--font-sans)',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="submit"
              disabled={!text.trim() || status === 'loading'}
              style={{
                background: status === 'loading'
                  ? '#94a3b8'
                  : 'linear-gradient(135deg,#0a66c2,#0077b5)',
                color: 'white', border: 'none',
                padding: '10px 24px', borderRadius: 10,
                fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              {status === 'loading' ? '⏳ Saving...' : '📥 Import to Blog'}
            </button>

            {status === 'ok' && (
              <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.88rem' }}>
                ✓ {msg}
              </span>
            )}
            {status === 'error' && (
              <span style={{ color: '#ef4444', fontSize: '0.88rem' }}>{msg}</span>
            )}
          </div>
        </form>
      </div>

      {/* ── Zapier Auto Sync ── */}
      <div style={{
        background: 'var(--bg-soft)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 28, marginBottom: 28
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg,#ff4a00,#ff6b35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }}>⚡</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Automatic Sync via Zapier (Free)</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              LinkedIn pe post karo → automatically blog me aa jaye
            </div>
          </div>
        </div>

        {/* Webhook URL */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-soft)' }}>
            Your Webhook URL
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              readOnly
              value={webhookUrl}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 10,
                border: '1.5px solid var(--border)',
                background: 'var(--bg)', color: 'var(--text-muted)',
                fontSize: '0.85rem', fontFamily: 'monospace',
              }}
            />
            <button
              onClick={copyWebhook}
              style={{
                padding: '10px 18px', borderRadius: 10,
                border: '1.5px solid var(--border)',
                background: copied ? '#22c55e' : 'var(--bg)',
                color: copied ? 'white' : 'var(--text-soft)',
                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
              }}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>

        {/* Steps */}
        <div style={{ fontSize: '0.88rem' }}>
          <div style={{ fontWeight: 700, marginBottom: 14, color: 'var(--text)' }}>
            Setup Steps (5 minutes):
          </div>

          {[
            {
              n: 1,
              title: 'Zapier account banao',
              desc: <>Go to <a href="https://zapier.com" target="_blank" rel="noreferrer" style={{ color: '#0a66c2' }}>zapier.com</a> and create a free account.</>,
            },
            {
              n: 2,
              title: '"Create Zap" click karo',
              desc: 'Dashboard pe "Create Zap" button click karo.',
            },
            {
              n: 3,
              title: 'Trigger: LinkedIn',
              desc: 'Trigger app: LinkedIn → Event: "New Share Update" (apne account se) → Connect your LinkedIn account.',
            },
            {
              n: 4,
              title: 'Action: Webhooks by Zapier',
              desc: (
                <>
                  Action app: <strong>Webhooks by Zapier</strong> → Event: <strong>POST</strong> → URL mein apna webhook URL paste karo (upar copy karo).<br/>
                  <span style={{ color: 'var(--text-muted)' }}>Payload type: JSON. Data:</span>
                  <pre style={{
                    background: '#0f172a', color: '#e2e8f0', borderRadius: 8,
                    padding: '10px 14px', marginTop: 8,
                    fontSize: '0.78rem', fontFamily: 'monospace', lineHeight: 1.6,
                    overflowX: 'auto'
                  }}>
{`{
  "text": "{{Text}}",
  "url":  "{{Share URL}}",
  "secret": "YOUR_SECRET_HERE"
}`}
                  </pre>
                </>
              ),
            },
            {
              n: 5,
              title: '.env.local mein secret set karo',
              desc: (
                <>
                  Apni portfolio project ke <code style={{ background: 'var(--bg)', padding: '1px 5px', borderRadius: 4 }}>.env.local</code> file mein add karo:
                  <pre style={{
                    background: '#0f172a', color: '#22c55e', borderRadius: 8,
                    padding: '10px 14px', marginTop: 8,
                    fontSize: '0.78rem', fontFamily: 'monospace'
                  }}>LINKEDIN_WEBHOOK_SECRET=koi-bhi-strong-secret-likho</pre>
                  Wahi secret Zapier ke payload mein bhi daalo.
                </>
              ),
            },
            {
              n: 6,
              title: 'Zap activate karo — done!',
              desc: 'Ab jab bhi LinkedIn pe post karoge, automatically aapke blog mein aa jayegi. ✅',
            },
          ].map(step => (
            <div key={step.n} style={{
              display: 'flex', gap: 14, marginBottom: 18,
              paddingBottom: 18,
              borderBottom: step.n < 6 ? '1px solid var(--border)' : 'none'
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#4f46e5,#06b6d4)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 800,
              }}>{step.n}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>{step.title}</div>
                <div style={{ color: 'var(--text-soft)', lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── View Blog ── */}
      <div style={{ textAlign: 'center' }}>
        <a
          href="/blog"
          target="_blank"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#4f46e5,#06b6d4)',
            color: 'white', padding: '11px 28px', borderRadius: 12,
            fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
          }}
        >
          View Blog →
        </a>
      </div>
    </div>
  );
}
