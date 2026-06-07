'use client';

export default function CEOImage() {
  return (
    <div className="image-card" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden' }}>
      <img
        src="/abdul-profile.jpg"
        alt="Abdul Rehman — QA Engineer"
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          display: 'block',
          borderRadius: 20,
        }}
      />
    </div>
  );
}
