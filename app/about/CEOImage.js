'use client';
import { useState } from 'react';

export default function CEOImage() {
  const [hasError, setHasError] = useState(false);
  return (
    <div className="image-card">
      <div className="initials">AR</div>
      {!hasError && (
        <img
          src="/images/ceo.png"
          alt="Abdul Rehman, Founder & CEO of NextGen Digital Hub"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
