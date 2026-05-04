// GET (admin) — list contact submissions
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongodb';
import Message from '@/models/Message';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const items = await Message.find({}).sort({ createdAt: -1 }).limit(200).lean();
    return Response.json({ items: items.map((m) => ({ ...m, _id: String(m._id) })) });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
