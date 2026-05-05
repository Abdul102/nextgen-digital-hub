'use client';
import { useEffect, useState } from 'react';

export default function CEOImage() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const url = data?.settings?.ceoPhoto;
        if (url) setPhoto(url);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="image-card">
      <div className="initials">AR</div>
      {photo ? (
        <img src={photo} alt="Founder & CEO" loading="lazy" />
      ) : (
        // Fallback to bundled file if user already added one to public/images/
        <img
          src="/images/ceo.png"
          alt="Founder & CEO"
          onError={(e) => e.target.remove()}
          loading="lazy"
        />
      )}
    </div>
  );
}
