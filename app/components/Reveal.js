'use client';
import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', stagger = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${stagger ? 'reveal-stagger' : ''} ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
