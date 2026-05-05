'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">N</span>
          <span>NextGen <span className="gradient-text">Digital Hub</span></span>
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <ThemeToggle />
          <Link href="/contact" className="btn btn-ghost btn-sm">Get a Quote</Link>
          <Link href="/contact" className="btn btn-primary btn-sm">Get Started</Link>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
