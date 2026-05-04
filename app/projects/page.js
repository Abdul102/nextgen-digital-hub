import Link from 'next/link';
import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';

export const metadata = {
  title: 'Projects & Portfolio | NextGen Digital Hub',
  description: 'Portfolio of SaaS platforms, AI tools, QA automation systems, and modern web apps shipped for global clients.'
};

const PROJECTS = [
  { name: 'PivotIQ', cat: 'SaaS Platform', desc: 'Multi-tenant analytics platform for B2B sales teams. Real-time dashboards, AI insights, Stripe billing.', stack: ['Next.js','PostgreSQL','Stripe','AWS'], thumb: 'thumb-1' },
  { name: 'LumenAI', cat: 'AI Tool', desc: 'HIPAA-compliant AI assistant for clinicians. RAG over medical knowledge bases with verified citations.', stack: ['Python','LangChain','OpenAI','Pinecone'], thumb: 'thumb-2' },
  { name: 'TestForge', cat: 'QA Automation', desc: 'End-to-end testing framework with self-healing locators, parallel execution, CI/CD integration.', stack: ['Playwright','TypeScript','GitHub Actions'], thumb: 'thumb-3' },
  { name: 'FlowOps', cat: 'Web App', desc: 'Drag-and-drop workflow builder for ops teams. Custom triggers, integrations, audit logs.', stack: ['React','Node.js','Redis','Docker'], thumb: 'thumb-4' },
  { name: 'Skylane', cat: 'SaaS Platform', desc: 'Fleet tracking and route optimization for mid-market logistics companies.', stack: ['React Native','GraphQL','MapBox','GCP'], thumb: 'thumb-5' },
  { name: 'CodeMuse', cat: 'AI Tool', desc: 'VSCode + GitHub bot that reviews PRs using LLMs. Security, style, and architecture feedback in seconds.', stack: ['TypeScript','OpenAI','GitHub API'], thumb: 'thumb-6' }
];

export default function ProjectsPage() {
  return (
    <SiteShell>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our work</span>
            <h1>Projects We're <span className="gradient-text">Proud Of</span></h1>
            <p>A selection of platforms, tools, and systems we've shipped — from AI assistants to enterprise QA frameworks.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal stagger className="grid grid-3">
            {PROJECTS.map((p) => (
              <div className="project-card" key={p.name}>
                <div className={`project-thumb ${p.thumb}`}>
                  <span className="badge">{p.cat}</span>
                  <span className="label">{p.name}</span>
                </div>
                <div className="project-info">
                  <h3>{p.name} — {p.cat}</h3>
                  <p>{p.desc}</p>
                  <div className="tech-stack">
                    {p.stack.map((t) => <span key={t} className="tech">{t}</span>)}
                  </div>
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
              <h2>Want your project featured here next?</h2>
              <p>We're booking new projects for next quarter. Let's build something worth showing off.</p>
              <Link href="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
