// GET (public, list) and POST (admin, create) for blog posts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongodb';
import Post from '@/models/Post';

export const runtime = 'nodejs';

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
    return Response.json({ posts: posts.map((p) => ({ ...p, _id: String(p._id) })) });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { title, excerpt, body: content, topic, thumbVariant, readTime, published } = body || {};
  if (!title || !content) {
    return Response.json({ error: 'Title and body required.' }, { status: 400 });
  }
  try {
    await dbConnect();
    const baseSlug = slugify(title);
    const slug = baseSlug + '-' + Math.random().toString(36).slice(2, 6);
    const doc = await Post.create({
      title, excerpt, body: content, topic, thumbVariant, readTime,
      slug, published: published !== false
    });
    return Response.json({ ok: true, id: String(doc._id) });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
