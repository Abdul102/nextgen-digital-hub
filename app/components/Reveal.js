'use client';
import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', stagger = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Safety: if element is already in viewport on mount, show immediately
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );
    obs.observe(ref.current);

    // Final safety net — force-show after 1.5s no matter what
    const fallback = setTimeout(() => setVisible(true), 1500);

    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${stagger ? 'reveal-stagger' : ''} ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
