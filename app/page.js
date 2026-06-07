import Link from 'next/link';
import SiteShell from './components/SiteShell';
import Reveal from './components/Reveal';
import StatCounter from './components/StatCounter';
import HeroVideo from './components/HeroVideo';

export const metadata = {
  title: 'Abdul Rehman — QA Engineer | AI Testing | Automation Specialist',
  description: 'Abdul Rehman — Software Quality Engineer specializing in AI agent testing, QA automation with Selenium/Playwright/Cypress, API testing, and CI/CD integration.'
};

export default function HomePage() {
  return (
    <SiteShell>

      {/* ── Hero ── */}
      <section className="hero hero-cinematic">
        <HeroVideo />
        <div className="hero-overlay" />
        <div className="container hero-grid" style={{position:"relative",zIndex:2}}>
          <Reveal className="hero-content">
            <span className="eyebrow">QA Engineer &nbsp;|&nbsp; AI Testing &nbsp;|&nbsp; Automation Specialist &nbsp;|&nbsp; MERN Developer</span>
            <h1>{"Hi, I'm "}<span className="gradient-text">Abdul Rehman</span></h1>
            <p className="lead">Software Quality Engineer with 3+ years at iClosed — I build automation frameworks, test AI agents, and integrate quality into every stage of the CI/CD pipeline.</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary btn-lg">
                {"Let's Work Together"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <Link href="/projects" className="btn btn-outline btn-lg">View My Projects</Link>
            </div>
            <div className="hero-stats">
              <div><StatCounter to={3} suffix="+" /><div className="stat-label">Years in QA</div></div>
              <div><StatCounter to={50} suffix="+" /><div className="stat-label">Test Suites Built</div></div>
              <div><StatCounter to={500} suffix="+" /><div className="stat-label">Bugs Caught in Prod</div></div>
            </div>
          </Reveal>
          <div className="hero-visual" />
        </div>
      </section>

      {/* ── What I Do ── */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">What I do</span>
            <h2 className="section-title">My <span className="gradient-text">Specializations</span></h2>
            <p className="section-subtitle">From manual testing to AI-powered automation — I cover the full quality spectrum.</p>
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
            <Link href="/services" className="btn btn-outline">See All Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Why Me ── */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="split">
            <Reveal>
              <span className="eyebrow">Why work with me</span>
              <h2 className="mb">A QA engineer who prevents bugs, not just finds them.</h2>
              <p className="mb">I combine deep automation expertise with a product mindset — helping teams ship faster with higher confidence and fewer production surprises.</p>
              <Link href="/about" className="btn btn-primary">Learn More About Me</Link>
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

      {/* ── Tech Stack ── */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Tech Stack</span>
            <h2 className="section-title">Tools I <span className="gradient-text">Work With</span></h2>
            <p className="section-subtitle">Modern QA & development tools I use daily in production.</p>
          </Reveal>
          <Reveal stagger className="grid grid-3" style={{marginTop: 32}}>
            {STACK.map((group) => (
              <div className="card" key={group.cat}>
                <div className="card-icon">{group.icon}</div>
                <h3>{group.cat}</h3>
                <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:10}}>
                  {group.tools.map(t => (
                    <span key={t} style={{
                      fontSize:'0.78rem', fontWeight:600,
                      padding:'3px 11px', borderRadius:999,
                      background:'rgba(79,70,229,0.08)',
                      color:'var(--primary)',
                      border:'1px solid rgba(79,70,229,0.18)'
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Testimonials</span>
            <h2 className="section-title">What People Say</h2>
            <p className="section-subtitle">Feedback from colleagues and clients I have worked with.</p>
          </Reveal>
          <Reveal stagger className="grid grid-3">
            {TESTIMONIALS.map((t) => (
              <div className="testimonial" key={t.name}>
                <div className="stars">★★★★★</div>
                <p className="quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="avatar">{t.initials}</div>
                  <div><div className="author-name">{t.name}</div><div className="author-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <h2>Open to New Opportunities</h2>
              <p>Looking for a QA Engineer for your team or project? I am available for full-time roles, freelance QA consulting, and AI testing contracts.</p>
              <Link href="/contact" className="btn btn-primary btn-lg">{"Get in Touch with Abdul"} &rarr;</Link>
            </div>
          </Reveal>
        </div>
      </section>

    </SiteShell>
  );
}

/* ── Data ── */

const SERVICES = [
  {
    title: 'QA Automation',
    desc: 'End-to-end automation frameworks using Playwright, Selenium, and Cypress — with self-healing locators and CI/CD integration.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
  },
  {
    title: 'AI Agent Testing',
    desc: 'Evaluation frameworks for LLM-powered apps — hallucination tracking, prompt regression, RAG accuracy testing using DeepEval and LangSmith.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a8 8 0 0 1 8 8c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 8-8z"/><circle cx="12" cy="10" r="3"/></svg>
  },
  {
    title: 'API & Performance Testing',
    desc: 'REST API testing with Postman and RestAssured. Load and stress testing with JMeter and k6 — with threshold gates in CI pipelines.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>
  },
  {
    title: 'Manual & Exploratory Testing',
    desc: 'Structured test case design, smoke and regression testing, bug triage and RCA — ensuring nothing ships without thorough validation.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
  },
  {
    title: 'CI/CD Quality Integration',
    desc: 'Plugging test suites into GitHub Actions, Jenkins, and GitLab CI so quality checks run automatically on every pull request.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/></svg>
  },
  {
    title: 'Web Development',
    desc: 'MERN stack development — building internal tools, QA dashboards, and test reporting portals with React and Node.js.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
  }
];

const STACK = [
  {
    cat: 'Test Automation',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>,
    tools: ['Playwright','Selenium','Cypress','PyTest','TestNG']
  },
  {
    cat: 'AI & LLM Testing',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg>,
    tools: ['DeepEval','LangSmith','Promptfoo','RAGAS','GPT-4o']
  },
  {
    cat: 'API & Performance',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
    tools: ['Postman','RestAssured','JMeter','k6','Grafana']
  },
  {
    cat: 'CI/CD & DevOps',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6"/></svg>,
    tools: ['GitHub Actions','Jenkins','GitLab CI','Docker','Pact']
  },
  {
    cat: 'Frontend Development',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    tools: ['React','Next.js','JavaScript','TypeScript','Tailwind']
  },
  {
    cat: 'Backend & Database',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    tools: ['Node.js','Express','MongoDB','PostgreSQL','REST APIs']
  }
];

const WHY = [
  {
    title: 'Shift-Left Mindset',
    desc: 'I catch bugs at design and dev stage — not after deployment. QA integrated from day one means fewer surprises.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg>
  },
  {
    title: 'AI-Powered Testing',
    desc: 'From self-healing locators to LLM evaluation pipelines — I use AI to make testing smarter, not just faster.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
  },
  {
    title: 'Full-Stack Context',
    desc: 'With MERN Stack experience, I understand how code works — giving me deeper insight into where bugs hide.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
  },
  {
    title: 'Clear Communication',
    desc: 'Detailed bug reports, honest status updates, and close collaboration with developers — no surprises, ever.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  }
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'VP Engineering, Lumen Health',
    initials: 'SC',
    quote: 'Abdul rebuilt our entire QA automation stack in six weeks. Release cycle dropped from monthly to weekly with far fewer bugs in production.'
  },
  {
    name: 'Marcus Reed',
    role: 'Founder, Pivoteer',
    initials: 'MR',
    quote: 'The AI testing framework Abdul set up catches issues we never would have caught manually. ROI was clear within the first month.'
  },
  {
    name: 'Aisha Patel',
    role: 'CTO, FlowOps',
    initials: 'AP',
    quote: 'A true quality engineer — not just a gatekeeper. Abdul helped the whole team move faster with real confidence in every release.'
  }
];
