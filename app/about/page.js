import Link from 'next/link';
import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';
import CEOImage from './CEOImage';

export const metadata = {
  title: 'About — Abdul Rehman | QA Engineer & AI Testing Specialist',
  description: 'Learn about Abdul Rehman — Software Quality Engineer with 3+ years at iClosed, specializing in QA automation, AI agent testing, and building self-healing test frameworks.'
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="eyebrow">About me</span>
            <h1>Quality is a <span className="gradient-text">Mindset</span></h1>
            <p>I'm a Software Quality Engineer obsessed with making sure software works the way users expect — from manual testing to AI-powered automation frameworks.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Who I am</span>
            <h2 className="mb">Engineering quality from code to production.</h2>
            <p className="mb">With 3+ years of hands-on experience at iClosed, I've grown from manual QA into a full automation specialist — building frameworks, testing AI agents, and integrating quality into every step of the CI/CD pipeline.</p>
            <p>I believe QA engineers are not gatekeepers — we're enablers who help the whole team move faster with confidence.</p>
          </Reveal>
          <Reveal>
            <div className="grid grid-2">
              <div className="card"><h3>3+ Years</h3><p>Professional QA experience at iClosed.</p></div>
              <div className="card"><h3>AI Testing</h3><p>LLM evaluation, RAG accuracy, hallucination tracking.</p></div>
              <div className="card"><h3>Full Stack</h3><p>MERN Stack certified, frontend to backend.</p></div>
              <div className="card"><h3>CI/CD Integrated</h3><p>GitHub Actions, Jenkins, GitLab CI pipelines.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">What I believe</span>
            <h2 className="section-title">My Philosophy</h2>
            <p className="section-subtitle">Quality is not a phase at the end of development — it's a mindset woven into every line of code.</p>
          </Reveal>
          <Reveal stagger className="grid grid-2">
            <div className="card">
              <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg></div>
              <h3>Shift-Left Testing</h3>
              <p>Catch bugs when they're cheapest to fix — at the design and development stage, not after deployment. I integrate testing into the earliest phases of every project.</p>
            </div>
            <div className="card">
              <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div>
              <h3>Automation First</h3>
              <p>Manual testing has its place, but scalable quality requires smart automation. I build self-healing frameworks that adapt to UI changes and reduce maintenance overhead.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">The person behind the work</span>
            <h2 className="section-title">Meet <span className="gradient-text">Abdul Rehman</span></h2>
          </Reveal>

          <div className="split mt-lg">
            <Reveal>
              <CEOImage />
            </Reveal>
            <Reveal>
              <span className="eyebrow">Software Quality Engineer</span>
              <h2 className="mb-sm">Abdul Rehman</h2>
              <p className="mb">Quality Assurance Specialist at iClosed (Feb 2023 – Present) — building automation frameworks, testing AI-powered features, and making sure every release ships with confidence.</p>
              <p className="mb">Previously a Frontend Developer at 1zero7 (Aug 2021 – Dec 2022) and Software Developer at Oxigen (Aug 2020 – Jan 2021) — giving me a full-stack perspective on quality.</p>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginTop: 24, marginBottom: 8 }}>Core Skills</h4>
              <div className="skill-tags">
                {[
                  'QA Automation','AI Agent Testing','Selenium','Playwright','Cypress','PyTest',
                  'Postman / RestAssured','JMeter / k6','CI/CD','GitHub Actions','DeepEval','LangSmith',
                  'React / Next.js','Node.js','MERN Stack','Bug Triage & RCA'
                ].map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>

              <div style={{ marginTop: 24, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="mailto:abdulrehmanzahoor10@gmail.com" className="btn btn-outline btn-sm">📧 Personal Email</a>
                <a href="mailto:abdul.rehman@iclosed.io" className="btn btn-outline btn-sm">💼 Work Email</a>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-2" style={{ marginTop: 64 }}>
            <Reveal>
              <h3 className="mb">Experience</h3>
              <div className="timeline">
                {[
                  {
                    year: 'Feb 2023 – Present',
                    title: 'Quality Assurance Specialist — iClosed',
                    desc: 'Full-time, remote (United States). Building QA automation frameworks, testing AI agents and LLM-powered features, integrating pipelines into CI/CD, and leading smoke + regression testing initiatives.',
                    skills: 'QA Automation · Bug Tracking · QA Engineering · Selenium · Smoke Testing'
                  },
                  {
                    year: 'Aug 2021 – Dec 2022',
                    title: 'Frontend Developer — 1zero7',
                    desc: 'Full-time, on-site (Pakistan). Built and maintained front-end interfaces, collaborated on UI/UX improvements, and contributed to component testing and cross-browser compatibility.',
                    skills: 'React · JavaScript · CSS · Front-End Development'
                  },
                  {
                    year: 'Aug 2020 – Jan 2021',
                    title: 'Software Developer — Oxigen',
                    desc: 'Part-time, on-site (Pakistan). Developed software features and participated in testing cycles for product releases.',
                    skills: 'Software Development · Testing · Collaboration'
                  }
                ].map((t) => (
                  <div className="timeline-item" key={t.year}>
                    <div className="timeline-year">{t.year}</div>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{t.skills}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <h3 className="mb">Education</h3>
              <div className="timeline">
                {[
                  {
                    year: 'Feb 2023 – Sep 2023',
                    title: 'Full Stack Web Deployment Diploma — ITI (Information Technology Institute)',
                    desc: 'Diploma in Computer Science, specializing in full stack web deployment with modern MERN stack technologies.',
                    skills: 'MERN Stack · Full Stack Web Development · Deployment'
                  },
                  {
                    year: 'Oct 2018 – Oct 2022',
                    title: 'BSCS — Bachelor of Science in Computer Science — Superior College',
                    desc: 'Completed 4-year Bachelor\'s degree in Computer Science. Focused on core CS fundamentals, software engineering, data structures, and front-end development.',
                    skills: 'Computer Science · Software Engineering · Front-End Development'
                  },
                  {
                    year: 'May 2015 – Apr 2017',
                    title: 'ICS, Computer Science — Punjab College',
                    desc: 'Intermediate in Computer Science, building the academic foundation for software and technology studies.',
                    skills: 'Computer Science · ICS'
                  }
                ].map((t) => (
                  <div className="timeline-item" key={t.year}>
                    <div className="timeline-year">{t.year}</div>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{t.skills}</p>
                  </div>
                ))}
              </div>

              <h3 className="mb" style={{ marginTop: 40 }}>LinkedIn Skills</h3>
              <div className="skill-tags">
                {[
                  'Testing','Bug Tracking','QA Automation','QA Engineering',
                  'Selenium','Quality Assurance','Smoke Testing','Budgeting'
                ].map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>

              <h3 className="mb" style={{ marginTop: 32 }}>Recent Focus Areas</h3>
              {[
                { title: 'Evaluation Frameworks for AI Agents', desc: 'DeepEval, Promptfoo, LangSmith, Cloud, GPT-based evaluation pipelines.' },
                { title: 'RAG Pipeline Testing', desc: 'Testing vector database accuracy, retrieval quality, and hallucination rates.' },
                { title: 'Self-Healing Test Scripts', desc: 'Building AI-assisted locator strategies that adapt to UI changes automatically.' },
                { title: 'Contract Testing', desc: 'Pact-based API contract testing integrated into shift-left CI/CD workflows.' }
              ].map((a) => (
                <div className="feature-row" key={a.title} style={{ marginBottom: 12 }}>
                  <div className="icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg></div>
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
              <h2>Open to new opportunities</h2>
              <p>Quality Engineer / SDET roles (remote / hybrid) · Freelance QA consulting for AI products · Speaking on AI testing and automation</p>
              <Link href="/contact" className="btn btn-primary btn-lg">Let's Connect</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
