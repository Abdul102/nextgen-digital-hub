import Link from 'next/link';
import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';
import ProjectsList from './ProjectsList';

export const metadata = {
  title: "Projects & Portfolio | Abdul Rehman — QA Engineer",
  description: 'Portfolio of QA automation frameworks, AI testing tools, and web apps built by Abdul Rehman — showcasing real engineering across automation, AI, and full-stack development.'
};

const PROJECTS = [
  {
    name: 'AI QA Agent',
    cat: 'AI Testing',
    desc: 'Playwright + Groq powered QA Automation platform — an AI agent that writes, runs, and fixes tests autonomously.',
    stack: ['Playwright', 'Groq', 'Python', 'AI Agent'],
    thumb: 'thumb-1',
    previewImg: '/thumbs/ai-qa-agent.svg',
    demoUrl: 'https://comfy-genie-e456b6.netlify.app/',
    challenge: 'Manual test writing is slow and automation suites require constant maintenance. The goal was to build an AI agent that understands the application, generates test cases, runs them, and self-heals when they break — all without human intervention.',
    solution: 'Built an AI QA Agent powered by Playwright for browser automation and Groq (LLaMA 3) for intelligent reasoning. The agent analyzes page structure, generates meaningful test scenarios, executes them in real browsers, and uses AI to debug and fix failing tests automatically. Deployed as an interactive demo on Netlify.',
    results: [
      { value: '10x', label: 'Faster test authoring' },
      { value: '0', label: 'Manual locator fixes' },
      { value: 'AI', label: 'Self-healing tests' }
    ]
  },
  {
    name: 'AutoGuard',
    cat: 'QA Automation',
    desc: 'Self-healing E2E test framework with AI-driven locator recovery, parallel sharding, and Slack/Jira alerts.',
    stack: ['Playwright', 'TypeScript', 'GitHub Actions', 'OpenAI'],
    thumb: 'thumb-2',
    previewImg: '/thumbs/autoguard.svg',
    demoUrl: '/demos/autoguard.html',
    challenge: 'A fast-growing SaaS had a brittle Selenium suite — selectors broke every sprint, test runtime was 4+ hours, and the QA team spent more time fixing tests than finding bugs.',
    solution: 'Rebuilt the suite in Playwright with an AI-powered self-healing layer: when a locator fails, the system uses GPT vision to locate the element by visual context. Parallel sharding across 20 GitHub Actions runners cut runtime to 11 minutes. Slack notifications include failure screenshots and one-click Jira ticket creation.',
    results: [
      { value: '11 min', label: 'Full suite runtime' },
      { value: '94%', label: 'Fewer flaky failures' },
      { value: '6x', label: 'Faster releases' }
    ]
  },
  {
    name: 'EvalForge',
    cat: 'LLM Evaluation',
    desc: 'LLM evaluation platform for AI agents — tracks hallucination rate, response quality, and prompt regression in CI/CD.',
    stack: ['Python', 'DeepEval', 'LangSmith', 'Promptfoo', 'React'],
    thumb: 'thumb-3',
    previewImg: '/thumbs/evalforge.svg',
    demoUrl: '/demos/evalforge.html',
    challenge: 'An AI startup was shipping LLM-powered features with no structured way to measure quality. Hallucinations were slipping into production and prompt changes had unpredictable effects on output quality.',
    solution: 'Built a comprehensive eval platform integrating DeepEval and LangSmith with a custom React dashboard. Each CI/CD push runs automated evals scoring faithfulness, relevance, and toxicity. Regressions block deploys. A/B prompt comparison lets the team test prompts before shipping.',
    results: [
      { value: '0', label: 'Hallucinations in prod' },
      { value: '87%', label: 'Eval coverage' },
      { value: '3x', label: 'Faster prompt iteration' }
    ]
  },
  {
    name: 'APIWatch',
    cat: 'API Testing',
    desc: 'Contract testing dashboard for microservices — Pact-based consumer/provider tests with live compatibility matrix.',
    stack: ['Postman', 'Pact', 'Node.js', 'Jenkins', 'Docker'],
    thumb: 'thumb-4',
    previewImg: '/thumbs/apiwatch.svg',
    demoUrl: '/demos/apiwatch.html',
    challenge: 'A microservices team was breaking integrations silently — APIs changed without consumers knowing. Late-discovery bugs in staging cost the team days of debugging before each release.',
    solution: 'Implemented Pact contract testing across 18 microservices with an automated broker that blocks provider deploys when consumer contracts fail. A live matrix dashboard shows every service\'s compatibility. Postman collections run smoke tests on every deployment.',
    results: [
      { value: '18', label: 'Services covered' },
      { value: '100%', label: 'Breaking changes caught' },
      { value: '2 days', label: 'Saved per release' }
    ]
  },
  {
    name: 'LoadSurge',
    cat: 'Performance Testing',
    desc: 'Automated load testing pipeline — k6 + JMeter suites in CI with p95 threshold gates and Grafana dashboards.',
    stack: ['k6', 'JMeter', 'Grafana', 'InfluxDB', 'GitHub Actions'],
    thumb: 'thumb-5',
    previewImg: '/thumbs/loadsurge.svg',
    demoUrl: '/demos/loadsurge.html',
    challenge: 'A high-traffic SaaS had no performance regression detection — load issues were discovered in production after a viral spike caused a 3-hour outage.',
    solution: 'Built dual load testing pipelines: k6 for synthetic API load (up to 10k VUs) and JMeter for user journey simulation. Results stream to Grafana + InfluxDB in real time. CI gates block merges when p95 latency exceeds 200ms — catching regressions before production.',
    results: [
      { value: 'p95 <200ms', label: 'Enforced per PR' },
      { value: '10k VUs', label: 'Peak load tested' },
      { value: '0', label: 'Prod perf incidents' }
    ]
  },
  {
    name: 'BugRadar',
    cat: 'AI Bug Triage',
    desc: 'AI-powered bug triage dashboard — GPT-4 classifies, deduplicates, and prioritizes incoming bug reports automatically.',
    stack: ['React', 'Node.js', 'OpenAI GPT-4', 'MongoDB', 'Jira API'],
    thumb: 'thumb-6',
    previewImg: '/thumbs/bugradar.svg',
    demoUrl: '/demos/bugradar.html',
    challenge: 'A QA team was receiving 200+ bug reports weekly. Manual triage took 3+ hours per day, duplicates were common, and critical bugs sometimes got buried under noise.',
    solution: 'Dashboard that uses GPT-4 to auto-classify incoming bugs by severity, component, and type. Semantic deduplication clusters similar reports. Jira tickets auto-created with suggested assignees and priority. QA team now triages in 20 minutes instead of 3 hours.',
    results: [
      { value: '93%', label: 'Triage accuracy' },
      { value: '20 min', label: 'Daily triage time' },
      { value: '40%', label: 'Duplicate reduction' }
    ]
  }
];

export default function ProjectsPage() {
  return (
    <SiteShell>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="eyebrow">My work</span>
            <h1>Projects I'm <span className="gradient-text">Proud Of</span></h1>
            <p>A selection of QA automation frameworks, AI testing tools, and web apps I've built. Click any card for the full case study.</p>
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
              <h2>Have a project that needs quality engineering?</h2>
              <p>I'm open to QA consulting, automation frameworks, and AI testing projects. Let's talk.</p>
              <Link href="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
