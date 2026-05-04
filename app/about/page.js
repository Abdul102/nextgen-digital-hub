import Link from 'next/link';
import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';
import CEOImage from './CEOImage';

export const metadata = {
  title: 'About Us — Mission, Vision & Leadership | NextGen Digital Hub',
  description: 'Learn about NextGen Digital Hub: mission to empower businesses with AI, QA, and full-stack engineering. Meet our founder Abdul Rehman.'
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="eyebrow">About us</span>
            <h1>We Build the <span className="gradient-text">Digital Future</span></h1>
            <p>NextGen Digital Hub is a team of engineers, designers, and AI specialists obsessed with shipping software that creates real business value.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Who we are</span>
            <h2 className="mb">Engineering excellence — without the agency overhead.</h2>
            <p className="mb">Founded in 2021, NextGen Digital Hub started with a simple belief: that small, senior teams can outperform large agencies by an order of magnitude.</p>
            <p>We're product-minded, AI-forward, and quality-obsessed — and we treat every engagement like it's our own product.</p>
          </Reveal>
          <Reveal>
            <div className="grid grid-2">
              <div className="card"><h3>120+ Projects</h3><p>Shipped across 18 industries.</p></div>
              <div className="card"><h3>Senior-Only Team</h3><p>Average 8+ years experience.</p></div>
              <div className="card"><h3>Global Footprint</h3><p>Distributed across 4 continents.</p></div>
              <div className="card"><h3>98% Retention</h3><p>Most clients stay 12+ months.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Mission & vision</span>
            <h2 className="section-title">Why we exist</h2>
            <p className="section-subtitle">Our north star: democratize world-class engineering for ambitious teams everywhere.</p>
          </Reveal>
          <Reveal stagger className="grid grid-2">
            <div className="card">
              <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
              <h3>Our Mission</h3>
              <p>To empower businesses of every size with AI-driven, quality-first digital solutions — accelerating their journey from idea to impact.</p>
            </div>
            <div className="card">
              <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
              <h3>Our Vision</h3>
              <p>A world where every business has access to the same caliber of engineering excellence as the top 1% of tech companies.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Leadership</span>
            <h2 className="section-title">Meet the <span className="gradient-text">Founder</span></h2>
            <p className="section-subtitle">The vision, expertise, and engineering DNA behind NextGen Digital Hub.</p>
          </Reveal>

          <div className="split mt-lg">
            <Reveal>
              <CEOImage />
            </Reveal>
            <Reveal>
              <span className="eyebrow">Founder & CEO</span>
              <h2 className="mb-sm">Abdul Rehman</h2>
              <p className="mb">Abdul is a multi-disciplinary technologist with deep expertise in QA engineering, AI systems, and full-stack development.</p>
              <p className="mb">He's led technical delivery on platforms used by hundreds of thousands of users — from AI-powered SaaS to enterprise QA automation frameworks.</p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginTop: 24, marginBottom: 8 }}>Core Skills</h4>
              <div className="skill-tags">
                {['QA Automation','AI Tools & LLMs','Web Development','SaaS Architecture','React / Next.js','Node.js','Cloud (AWS / GCP)','CI/CD'].map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid grid-2" style={{ marginTop: 64 }}>
            <Reveal>
              <h3 className="mb">Experience Timeline</h3>
              <div className="timeline">
                {[
                  { year: '2021 – Present', title: 'Founder & CEO — NextGen Digital Hub', desc: 'Built and scaled a 25-person remote engineering studio serving 45+ global clients.' },
                  { year: '2020 – 2021', title: 'Lead AI/QA Engineer — Enterprise SaaS', desc: 'Architected an AI-powered test generation framework that cut QA cycle time by 60%.' },
                  { year: '2018 – 2020', title: 'Senior Full-Stack Engineer', desc: 'Delivered React/Node platforms processing millions of transactions per month.' },
                  { year: '2016 – 2018', title: 'QA Automation Engineer', desc: 'Built end-to-end Selenium and Cypress suites for fintech and healthtech products.' }
                ].map((t) => (
                  <div className="timeline-item" key={t.year}>
                    <div className="timeline-year">{t.year}</div>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <h3 className="mb">Achievements</h3>
              {[
                { title: '120+ Successful Deliveries', desc: 'Across web, mobile, AI, and SaaS projects globally.' },
                { title: 'Built 4 Open-Source Tools', desc: 'Developer tools downloaded over 50,000 times.' },
                { title: 'Featured Speaker', desc: 'Spoken at 15+ conferences on AI in QA and SaaS architecture.' },
                { title: '98% Client Retention', desc: 'Most engagements extend beyond original scope.' }
              ].map((a) => (
                <div className="feature-row" key={a.title}>
                  <div className="icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg></div>
                  <div><h4>{a.title}</h4><p>{a.desc}</p></div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <h2>Want to work with us?</h2>
              <p>We take on a limited number of projects each quarter — let's see if we're a fit.</p>
              <Link href="/contact" className="btn btn-primary btn-lg">Start the Conversation</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
