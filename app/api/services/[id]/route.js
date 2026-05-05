import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongodb';
import Service from '@/models/Service';

export const runtime = 'nodejs';

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const updates = await req.json().catch(() => ({}));
  try {
    await dbConnect();
    await Service.findByIdAndUpdate(params.id, updates);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    await Service.findByIdAndDelete(params.id);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
