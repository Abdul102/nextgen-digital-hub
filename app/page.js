import Link from 'next/link';
import SiteShell from './components/SiteShell';
import Reveal from './components/Reveal';
import StatCounter from './components/StatCounter';

export const metadata = {
  title: 'NextGen Digital Hub — AI, QA & Digital Solutions for Modern Business',
  description: 'NextGen Digital Hub empowers businesses with AI Solutions, QA Testing, SaaS, Web & Mobile development. Premium digital services partner.'
};

export default function HomePage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <Reveal className="hero-content">
            <span className="eyebrow">Digital innovation, delivered.</span>
            <h1>Empowering Businesses with <span className="gradient-text">Next-Gen Digital Solutions</span></h1>
            <p className="lead">From AI-powered platforms to enterprise-grade QA, SaaS, and full-stack development — we build the technology that moves modern businesses forward.</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary btn-lg">Get a Free Quote
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <Link href="/services" className="btn btn-outline btn-lg">Explore Services</Link>
            </div>
            <div className="hero-stats">
              <div><StatCounter to={120} suffix="+" /><div className="stat-label">Projects Delivered</div></div>
              <div><StatCounter to={45} suffix="+" /><div className="stat-label">Global Clients</div></div>
              <div><StatCounter to={98} suffix="%" /><div className="stat-label">Client Satisfaction</div></div>
            </div>
          </Reveal>
          <Reveal className="hero-visual">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="floating-card fc-1">
              <span className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6"/></svg></span>
              AI Pipeline Active
            </div>
            <div className="floating-card fc-2">
              <span className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg></span>
              99.9% Uptime
            </div>
            <div className="floating-card fc-3">
              <span className="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M9 17V9M14 17v-5M19 17V5"/></svg></span>
              +312% Growth
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">What we do</span>
            <h2 className="section-title">Services Built for <span className="gradient-text">Modern Teams</span></h2>
            <p className="section-subtitle">A complete suite of digital engineering services — from AI to QA, web to cloud, all under one roof.</p>
          </Reveal>
          <Reveal stagger className="grid grid-3">
            {SERVICES.map((s) => (
              <div className="card" key={s.title}>
                <div className="card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </Reveal>
          <Reveal className="text-center mt-lg">
            <Link href="/services" className="btn btn-outline">View All Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why Us */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="split">
            <Reveal>
              <span className="eyebrow">Why choose us</span>
              <h2 className="mb">A partner that builds with you, not just for you.</h2>
              <p className="mb">We combine deep technical expertise with relentless focus on outcomes — delivering software that's fast, reliable, and built to last.</p>
              <Link href="/about" className="btn btn-primary">Learn More About Us</Link>
            </Reveal>
            <Reveal>
              {WHY.map((w) => (
                <div className="feature-row" key={w.title}>
                  <div className="icon">{w.icon}</div>
                  <div><h4>{w.title}</h4><p>{w.desc}</p></div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Testimonials</span>
            <h2 className="section-title">Trusted by ambitious teams</h2>
            <p className="section-subtitle">From early-stage startups to global enterprises — see how teams describe working with NextGen Digital Hub.</p>
          </Reveal>
          <Reveal stagger className="grid grid-3">
            {TESTIMONIALS.map((t) => (
              <div className="testimonial" key={t.name}>
                <div className="stars">★★★★★</div>
                <p className="quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="avatar">{t.initials}</div>
                  <div><div className="author-name">{t.name}</div><div className="author-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <h2>Ready to ship something remarkable?</h2>
              <p>Tell us about your idea — we'll get back within one business day with a clear, honest path forward.</p>
              <Link href="/contact" className="btn btn-primary btn-lg">Start Your Project →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

const SERVICES = [
  { title: 'AI Solutions', desc: 'Custom machine learning, LLM-powered assistants, intelligent automation, and predictive analytics that ship.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a8 8 0 0 1 8 8c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 8-8z"/><circle cx="12" cy="10" r="3"/></svg> },
  { title: 'QA & Software Testing', desc: 'End-to-end manual + automated testing, performance, security, and CI/CD-integrated quality engineering.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg> },
  { title: 'Web Development', desc: 'Lightning-fast websites and web apps built with React, Next.js, and modern best practices.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { title: 'Mobile Development', desc: 'Native iOS, Android, and cross-platform apps that delight users and scale with your business.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg> },
  { title: 'Cloud Applications', desc: 'AWS, GCP, and Azure-native architectures with elastic scaling, observability, and cost optimization.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10a4 4 0 0 0-3.5-4 6 6 0 0 0-11 3 4 4 0 0 0 0 8h14a4 4 0 0 0 0.5-7z"/></svg> },
  { title: 'Business Analytics', desc: 'Dashboards, data pipelines, and BI tooling that turn raw data into competitive advantage.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg> }
];

const WHY = [
  { title: 'AI-Driven Engineering', desc: 'We embed AI throughout our delivery process — from code review to QA — for faster, smarter outcomes.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg> },
  { title: 'Quality-First Mindset', desc: 'QA is baked into every sprint. Robust testing, observability, and zero-downtime releases — by default.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg> },
  { title: 'On-Time, Every Time', desc: 'Predictable delivery powered by transparent processes, weekly demos, and ruthless prioritization.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
  { title: 'Client-First Culture', desc: 'Direct access to senior engineers, weekly stand-ups, and shared Slack channels. No middlemen, ever.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> }
];

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'VP Engineering, Lumen Health', initials: 'SC', quote: 'NextGen rebuilt our entire QA stack in six weeks. Our release cycle dropped from monthly to weekly, with fewer bugs in production.' },
  { name: 'Marcus Reed', role: 'Founder, Pivoteer', initials: 'MR', quote: 'The AI assistant they built handles 70% of our customer queries. ROI was clear within the first month — incredible work.' },
  { name: 'Aisha Patel', role: 'CTO, FlowOps', initials: 'AP', quote: 'True partners, not vendors. They challenged our assumptions, simplified our architecture, and shipped a SaaS that just works.' }
];
