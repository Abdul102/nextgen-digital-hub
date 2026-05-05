import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongodb';
import Service from '@/models/Service';

export const runtime = 'nodejs';

export async function GET() {
  if (!process.env.MONGODB_URI) return Response.json({ services: [] });
  try {
    await dbConnect();
    const items = await Service.find({}).sort({ order: 1, createdAt: 1 }).lean();
    return Response.json({ services: items.map((s) => ({ ...s, _id: String(s._id) })) });
  } catch (e) {
    return Response.json({ services: [], error: String(e?.message || e) });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { title, description, icon, order, published } = body || {};
  if (!title || !description) return Response.json({ error: 'Title and description required' }, { status: 400 });
  try {
    await dbConnect();
    const doc = await Service.create({
      title, description, icon: icon || 'circle',
      order: typeof order === 'number' ? order : 0,
      published: published !== false
    });
    return Response.json({ ok: true, id: String(doc._id) });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
