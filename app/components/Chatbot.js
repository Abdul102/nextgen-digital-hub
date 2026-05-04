'use client';
import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm the NextGen AI assistant. How can I help you today?" }
  ]);
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      });
      if (res.ok) {
        const data = await res.json();
        setMessages([...next, { role: 'assistant', content: data.reply || 'Thanks!' }]);
      } else {
        setMessages([...next, { role: 'assistant', content: staticReply(text) }]);
      }
    } catch {
      setMessages([...next, { role: 'assistant', content: staticReply(text) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button className="chatbot-toggle" aria-label="Open chat" onClick={() => setOpen((v) => !v)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      <div className={`chatbot-window ${open ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="bot-avatar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
              <path d="M12 7v4M8 16h.01M16 16h.01" />
            </svg>
          </div>
          <div>
            <div className="bot-name">NextGen Assistant</div>
            <div className="bot-status">Online — typically replies instantly</div>
          </div>
          <button className="chatbot-close" style={{ marginLeft: 'auto', color: 'white', opacity: 0.7 }} onClick={() => setOpen(false)} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="chatbot-body" ref={bodyRef}>
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'user-msg' : 'bot-msg'}>{m.content}</div>
          ))}
          {busy && <div className="bot-msg" style={{ opacity: 0.6 }}>...</div>}
        </div>
        <form className="chatbot-input" onSubmit={send}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
          />
          <button type="submit" disabled={busy}>Send</button>
        </form>
      </div>
    </>
  );
}

function staticReply(t) {
  const s = t.toLowerCase();
  if (/price|quote|cost/.test(s)) return 'Pricing depends on scope — share details on the Contact page and we’ll send a tailored quote within 24 hours.';
  if (/ai|llm/.test(s)) return 'We build production AI: LLM apps, RAG systems, intelligent automation. Want to discuss?';
  if (/qa|test/.test(s)) return 'Our QA practice covers manual, automated, performance & security testing — fully integrated with CI/CD.';
  return "Thanks! Use our Contact page and a real human will follow up within 24 hours.";
}
