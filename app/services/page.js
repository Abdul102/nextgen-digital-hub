import Link from 'next/link';
import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';

export const metadata = {
  title: 'Services — AI, QA, Web, Mobile, SaaS & Cloud | NextGen Digital Hub',
  description: 'Explore NextGen Digital Hub\'s full service catalog: AI, QA, SaaS, Web, Mobile, Cloud, Android and Business Analytics.'
};

const SERVICES = [
  { title: 'Application Development', desc: 'End-to-end custom software — robust enterprise apps and consumer platforms designed for scale, security, and longevity.' },
  { title: 'Mobile Application Development', desc: 'iOS and Android apps built with React Native, Flutter, or native — performant, beautiful, and store-ready.' },
  { title: 'SaaS Development', desc: 'Multi-tenant platforms with subscription billing, analytics, RBAC, and the polish your customers expect.' },
  { title: 'Web Development', desc: 'Modern web experiences using Next.js, React, and headless CMS — optimized for Core Web Vitals and SEO.' },
  { title: 'Cloud Application Development', desc: 'Cloud-native apps on AWS, Azure, GCP. Serverless, containerized, observable — engineered for resilience.' },
  { title: 'Business Analytics', desc: 'Data warehouses, ETL/ELT pipelines, BI dashboards, and predictive models that surface real insight.' },
  { title: 'Android Development', desc: 'Native Android with Kotlin & Jetpack Compose — Material 3 design, performant, and battery-friendly.' },
  { title: 'QA & Software Testing', desc: 'Automated, manual, performance and security testing. Cypress, Playwright, JMeter — integrated into your CI/CD.' },
  { title: 'AI Solutions', desc: 'LLM integrations, custom ML models, RAG systems, intelligent agents — production-ready AI you can trust.' }
];

const PROCESS = [
  { num: '01', title: 'Discover', desc: 'Workshops, research, and a clear roadmap aligned to business outcomes.' },
  { num: '02', title: 'Design', desc: 'UX, UI, and architecture that\'s both beautiful and built to scale.' },
  { num: '03', title: 'Build', desc: 'Agile sprints, weekly demos, automated tests, and continuous deployment.' },
  { num: '04', title: 'Scale', desc: 'Performance tuning, monitoring, and ongoing support for the long haul.' }
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our services</span>
            <h1>Complete <span className="gradient-text">Digital Engineering</span> Stack</h1>
            <p>Nine integrated services that cover every phase of your product journey — from idea to scale.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal stagger className="grid grid-3">
            {SERVICES.map((s) => (
              <div className="card" key={s.title}>
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">How we work</span>
            <h2 className="section-title">Our Delivery Process</h2>
            <p className="section-subtitle">A proven four-phase approach that minimizes risk and maximizes shipped value.</p>
          </Reveal>
          <Reveal stagger className="grid grid-4">
            {PROCESS.map((p) => (
              <div className="card text-center" key={p.num}>
                <div className="card-icon" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.2rem' }}>{p.num}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <h2>Have a project in mind?</h2>
              <p>Whether it's a fresh build or a rescue mission — we love a good challenge. Let's talk.</p>
              <Link href="/contact" className="btn btn-primary btn-lg">Get a Free Quote</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
