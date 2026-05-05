import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';
import BlogList from './BlogList';
import { dbConnect } from '@/lib/mongodb';
import Post from '@/models/Post';

export const metadata = {
  title: 'Blog & Articles | NextGen Digital Hub',
  description: 'Insights on AI in QA, software testing trends, SaaS development, automation, and modern engineering practices.'
};

export const revalidate = 60;

const FALLBACK = [
  {
    _id: '1',
    title: 'How LLMs Are Reshaping Software QA in 2026',
    excerpt: 'AI-generated test cases, self-healing locators — a practical look at how ML is changing QA.',
    topic: 'AI in QA',
    readTime: '6 min read',
    thumbVariant: 'thumb-1',
    body: `Large Language Models have fundamentally shifted what's possible in QA. Where once we wrote every test case by hand, today we describe behavior in plain English and an LLM scaffolds the test for us — covering edge cases we'd routinely miss.\n\nThe biggest unlock isn't generation, though. It's self-healing locators: when a button moves or a CSS class changes, traditional Selenium tests break. AI-driven locators read the DOM semantically and find the element by purpose, not position. Our internal benchmarks show 60% fewer flakes after adoption.\n\nThe catch? You still need humans for test design, exploratory testing, and judgement calls. AI accelerates execution; it doesn't replace QA expertise. Teams who treat it as augmentation — not replacement — see the biggest gains.`
  },
  {
    _id: '2',
    title: 'Software Testing Trends to Watch This Year',
    excerpt: 'Shift-left, observability-driven testing, and contract testing — what\'s working at scale right now.',
    topic: 'Testing Trends',
    readTime: '8 min read',
    thumbVariant: 'thumb-3',
    body: `Three trends are dominating QA conversations in 2026.\n\nFirst, shift-left has matured. It's no longer just "developers should write tests" — it's full-stack quality ownership: product writes acceptance criteria, design includes accessibility specs, devs ship with tests, and QA owns the strategy.\n\nSecond, observability-driven testing. Production telemetry feeds back into test prioritization. The flows that real users hit hardest are the ones that get the most coverage. This eliminates the eternal "we tested everything but the thing that broke."\n\nThird, contract testing is finally going mainstream. With microservices everywhere, integration tests are too slow and flaky. Pact and similar tools let services verify their contracts independently — a quiet revolution that's killing entire categories of regression bugs.`
  },
  {
    _id: '3',
    title: 'Building a Multi-Tenant SaaS — Lessons Learned',
    excerpt: 'Schema-per-tenant or shared-schema? Billing? Permissions? A field guide from shipping eight production SaaS platforms.',
    topic: 'SaaS Architecture',
    readTime: '10 min read',
    thumbVariant: 'thumb-2',
    body: `After shipping eight multi-tenant SaaS products, here's what I'd tell my younger self.\n\nStart with a shared-schema model with a tenant_id column on every table. Don't over-engineer with schema-per-tenant on day one — you'll regret the migration overhead. Move to dedicated schemas only when a customer demands it for compliance.\n\nPermissions are harder than you think. Build RBAC from the start, even for two roles. Retrofitting permissions onto an app that assumed "user is admin" is among the most painful refactors in software.\n\nBilling: just use Stripe. Don't build a billing system. The temptation is real ("we just need usage metering!") but you'll spend years on edge cases — refunds, prorations, failed cards, dunning, tax — that Stripe has solved.\n\nFinally: tenant isolation in queries is the #1 source of catastrophic bugs. Use Postgres row-level security or build a query wrapper that enforces it. Trust no one — including yourself at 2am.`
  },
  {
    _id: '4',
    title: 'The 7 Automation Tools Our Team Actually Uses',
    excerpt: 'Not the trendy ones — the ones that survived our internal benchmarks across CI, deploys, monitoring.',
    topic: 'Automation',
    readTime: '5 min read',
    thumbVariant: 'thumb-5',
    body: `Here are the seven tools that earned their place in our default stack — after rigorous internal benchmarks.\n\n1. GitHub Actions for CI: not the fastest, but the simplest. The matrix builds and reusable workflows make it the easiest team-wide adoption.\n\n2. Playwright for E2E: faster than Cypress, more reliable, better cross-browser. The upgrade is worth it.\n\n3. Vercel for deploys: zero-config Next.js hosting, preview environments per PR, observability built-in.\n\n4. Sentry for errors: nothing else comes close for tracking down user-facing bugs with full stack traces and breadcrumbs.\n\n5. Datadog for metrics: pricey but worth it once you cross 100k events/day. The alerting and dashboards are unmatched.\n\n6. Linear for issue tracking: Jira fatigue is real. Linear's keyboard-first UX recovers hours per dev per week.\n\n7. Slack + Github + Linear integrations: the boring glue that ties it all together. Notifications in one place. No app-switching tax.`
  },
  {
    _id: '5',
    title: 'Production-Ready RAG: A Pragmatic Guide',
    excerpt: 'Chunking, embeddings, reranking, evals — the architectural choices that separate demos from production.',
    topic: 'AI Engineering',
    readTime: '12 min read',
    thumbVariant: 'thumb-6',
    body: `Building a RAG demo takes a weekend. Building one that holds up in production takes months. Here's why.\n\nChunking is everything. Naive 1000-char chunks lose context. Use semantic chunking aware of document structure — headers, paragraphs, code blocks. We saw a 35% retrieval quality boost from this alone.\n\nEmbeddings are commodities now. OpenAI's text-embedding-3-small is fine for most use cases. Spend your innovation budget elsewhere.\n\nReranking is the secret weapon. Pull top 50 from the vector store, rerank with a cross-encoder, take top 5 into the prompt. Cohere and Voyage have great rerankers.\n\nEvals matter more than the model. Without an eval set, you're flying blind. Build a golden set of 100 questions with expected behaviors and run it on every change. We use simple LLM-as-judge for fast iteration.\n\nFinally: cite everything. Users trust answers with citations 4x more than ungrounded ones, even when the unmounted answer is correct. Trust is a UI problem.`
  },
  {
    _id: '6',
    title: 'Why Senior-Only Teams Ship 3x Faster',
    excerpt: 'Counterintuitive math on team composition, ownership, and the cost of context-switching.',
    topic: 'Engineering Culture',
    readTime: '7 min read',
    thumbVariant: 'thumb-4',
    body: `The conventional wisdom: bigger teams ship faster. The reality: a team of 4 senior engineers consistently outperforms a team of 8 mixed-experience engineers in our data.\n\nWhy? Three reasons.\n\nFirst, communication overhead. Brooks's Law is real. Each additional team member adds n-1 communication channels. Five people = 10 channels. Ten people = 45 channels. Mixed teams need even more — juniors need mentorship, code reviews take longer.\n\nSecond, context-switching tax. Senior engineers can hold a system in their head and design end-to-end. Mixed teams require constant handoffs, which means constant re-loading of context.\n\nThird, decision velocity. Senior teams default to "just decide" — they've seen this problem before. Mixed teams require more debate and design docs because some folks are still learning the why.\n\nThe trade-off, of course, is hiring difficulty and budget. But for projects with a deadline, fewer better engineers wins almost every time.`
  }
];

async function getPosts() {
  if (!process.env.MONGODB_URI) return FALLBACK;
  try {
    await dbConnect();
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 }).limit(20).lean();
    if (!posts.length) return FALLBACK;
    return posts.map((p) => ({
      _id: String(p._id),
      title: p.title,
      excerpt: p.excerpt || '',
      body: p.body || '',
      topic: p.topic,
      readTime: p.readTime,
      thumbVariant: p.thumbVariant,
      coverImage: p.coverImage || ''
    }));
  } catch {
    return FALLBACK;
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <SiteShell>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Blog & insights</span>
            <h1>Ideas from the <span className="gradient-text">Frontlines</span></h1>
            <p>Click any post to read the full article.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal stagger>
            <BlogList posts={posts} />
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
