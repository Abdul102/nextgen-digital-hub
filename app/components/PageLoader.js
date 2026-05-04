'use client';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 350);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`page-loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-ring" />
    </div>
  );
}
