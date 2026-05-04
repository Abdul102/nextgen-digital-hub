import Link from 'next/link';
import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';
import ProjectsList from './ProjectsList';

export const metadata = {
  title: 'Projects & Portfolio | NextGen Digital Hub',
  description: 'Portfolio of SaaS platforms, AI tools, QA automation systems, and modern web apps shipped for global clients.'
};

const PROJECTS = [
  {
    name: 'PivotIQ',
    cat: 'SaaS Platform',
    desc: 'Multi-tenant analytics platform for B2B sales teams. Real-time dashboards, AI insights, Stripe billing.',
    stack: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
    thumb: 'thumb-1',
    challenge: 'Sales teams were drowning in spreadsheets, with no real-time visibility into pipeline health or rep performance. The client needed an analytics platform that scaled across hundreds of accounts without sacrificing speed.',
    solution: 'We built a multi-tenant SaaS on Next.js + PostgreSQL with row-level security for tenant isolation. Real-time dashboards used WebSockets, and an LLM-powered insights engine surfaces anomalies and recommendations in plain English.',
    results: [
      { value: '4.2x', label: 'Faster reporting' },
      { value: '$1.2M', label: 'ARR in year 1' },
      { value: '99.9%', label: 'Uptime' }
    ]
  },
  {
    name: 'LumenAI',
    cat: 'AI Tool',
    desc: 'HIPAA-compliant AI assistant for clinicians. RAG over medical knowledge bases with verified citations.',
    stack: ['Python', 'LangChain', 'OpenAI', 'Pinecone'],
    thumb: 'thumb-2',
    challenge: 'Clinicians spend hours searching medical literature for evidence-based answers. Existing AI tools hallucinated and lacked citations — a non-starter in healthcare.',
    solution: 'Production-grade RAG architecture: medical knowledge bases vectorized in Pinecone, retrieval with reranking, and answers strictly grounded in retrieved documents with verifiable citations. Full HIPAA compliance and audit logs.',
    results: [
      { value: '70%', label: 'Time saved per query' },
      { value: '0', label: 'Hallucinated citations' },
      { value: '12k+', label: 'Daily queries' }
    ]
  },
  {
    name: 'TestForge',
    cat: 'QA Automation',
    desc: 'End-to-end testing framework with self-healing locators, parallel execution, CI/CD integration.',
    stack: ['Playwright', 'TypeScript', 'GitHub Actions'],
    thumb: 'thumb-3',
    challenge: 'A growing SaaS product had a flaky test suite — every release required manual triage. Test runtime had grown to 4+ hours, blocking deployments.',
    solution: 'Rebuilt the suite in Playwright with self-healing locators (AI-driven element discovery when selectors break), parallel sharding across 16 GitHub Actions runners, and smart retries that distinguish real failures from infra flakes.',
    results: [
      { value: '12 min', label: 'Full suite runtime' },
      { value: '60%', label: 'Fewer flakes' },
      { value: '5x', label: 'Faster releases' }
    ]
  },
  {
    name: 'FlowOps',
    cat: 'Web App',
    desc: 'Drag-and-drop workflow builder for ops teams. Custom triggers, integrations, audit logs.',
    stack: ['React', 'Node.js', 'Redis', 'Docker'],
    thumb: 'thumb-4',
    challenge: 'An ops team was stitching together Zapier, scripts, and spreadsheets to coordinate cross-team workflows. Lack of audit trail and brittleness was causing missed SLAs.',
    solution: 'A drag-and-drop visual workflow builder with conditional branching, custom triggers, and 40+ pre-built integrations. Backed by Redis queues for retries and a complete audit log for SOC 2 compliance.',
    results: [
      { value: '85%', label: 'Less manual work' },
      { value: '40+', label: 'Integrations' },
      { value: 'SOC 2', label: 'Type II compliant' }
    ]
  },
  {
    name: 'Skylane',
    cat: 'SaaS Platform',
    desc: 'Fleet tracking and route optimization for mid-market logistics companies.',
    stack: ['React Native', 'GraphQL', 'MapBox', 'GCP'],
    thumb: 'thumb-5',
    challenge: 'Mid-market logistics carriers couldn\'t afford enterprise TMS systems but were losing margin to inefficient routing and lack of real-time fleet visibility.',
    solution: 'Mobile + web platform with live GPS tracking, ML-driven route optimization (fuel/time/mileage), and customer-facing tracking pages. Built for offline-first usage on driver mobile apps.',
    results: [
      { value: '18%', label: 'Fuel savings' },
      { value: '2.4x', label: 'On-time deliveries' },
      { value: '500+', label: 'Drivers onboarded' }
    ]
  },
  {
    name: 'CodeMuse',
    cat: 'AI Tool',
    desc: 'VSCode + GitHub bot that reviews PRs using LLMs. Security, style, and architecture feedback in seconds.',
    stack: ['TypeScript', 'OpenAI', 'GitHub API'],
    thumb: 'thumb-6',
    challenge: 'Engineering teams wanted faster code reviews but human reviewers were a bottleneck. Existing AI tools missed context and produced generic suggestions.',
    solution: 'A GitHub App that ingests PR diff + relevant repo files, runs targeted LLM reviews (security, style, architecture, testing), and posts inline comments. Customizable rule packs per team.',
    results: [
      { value: '3x', label: 'Faster review cycle' },
      { value: '40%', label: 'More issues caught' },
      { value: '50k+', label: 'Reviews shipped' }
    ]
  }
];

export default function ProjectsPage() {
  return (
    <SiteShell>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our work</span>
            <h1>Projects We're <span className="gradient-text">Proud Of</span></h1>
            <p>A selection of platforms, tools, and systems we've shipped. Click any card for the full case study.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal stagger>
            <ProjectsList projects={PROJECTS} />
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
