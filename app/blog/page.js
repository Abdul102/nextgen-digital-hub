import SiteShell from '../components/SiteShell';
import Reveal from '../components/Reveal';
import { dbConnect } from '@/lib/mongodb';
import Post from '@/models/Post';

export const metadata = {
  title: 'Blog & Articles | NextGen Digital Hub',
  description: 'Insights on AI in QA, software testing trends, SaaS development, automation, and modern engineering practices.'
};

export const revalidate = 60; // ISR — refresh blog every 60s

const FALLBACK = [
  { _id: '1', title: 'How LLMs Are Reshaping Software QA in 2026', excerpt: 'AI-generated test cases, self-healing locators — a practical look at how ML is changing QA.', topic: 'AI in QA', readTime: '6 min read', thumbVariant: 'thumb-1' },
  { _id: '2', title: 'Software Testing Trends to Watch This Year', excerpt: 'Shift-left, observability-driven testing, and contract testing — what\'s working at scale right now.', topic: 'Testing Trends', readTime: '8 min read', thumbVariant: 'thumb-3' },
  { _id: '3', title: 'Building a Multi-Tenant SaaS — Lessons Learned', excerpt: 'Schema-per-tenant or shared-schema? Billing? Permissions? A field guide from shipping eight production SaaS platforms.', topic: 'SaaS Architecture', readTime: '10 min read', thumbVariant: 'thumb-2' },
  { _id: '4', title: 'The 7 Automation Tools Our Team Actually Uses', excerpt: 'Not the trendy ones — the ones that survived our internal benchmarks across CI, deploys, monitoring.', topic: 'Automation', readTime: '5 min read', thumbVariant: 'thumb-5' },
  { _id: '5', title: 'Production-Ready RAG: A Pragmatic Guide', excerpt: 'Chunking, embeddings, reranking, evals — the architectural choices that separate demos from production.', topic: 'AI Engineering', readTime: '12 min read', thumbVariant: 'thumb-6' },
  { _id: '6', title: 'Why Senior-Only Teams Ship 3x Faster', excerpt: 'Counterintuitive math on team composition, ownership, and the cost of context-switching.', topic: 'Engineering Culture', readTime: '7 min read', thumbVariant: 'thumb-4' }
];

async function getPosts() {
  // Skip DB at build time if not configured — use fallback so build never fails
  if (!process.env.MONGODB_URI) return FALLBACK;
  try {
    await dbConnect();
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 }).limit(20).lean();
    if (!posts.length) return FALLBACK;
    return posts.map((p) => ({
      _id: String(p._id),
      title: p.title,
      excerpt: p.excerpt || '',
      topic: p.topic,
      readTime: p.readTime,
      thumbVariant: p.thumbVariant
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
            <p>Practical insights on AI, QA, SaaS architecture, and the tools shaping the next decade of software engineering.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal stagger className="grid grid-3">
            {posts.map((p) => (
              <article key={p._id} className="blog-card">
                <div className={`blog-thumb ${p.thumbVariant}`}>
                  <span className="topic">{p.topic}</span>
                </div>
                <div className="blog-info">
                  <div className="blog-meta">
                    <span className="blog-tag">{p.topic}</span>
                    <span>· {p.readTime}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="read-more">Read more →</span>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
