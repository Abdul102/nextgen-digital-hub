// GET (public) and PATCH (admin) for site settings
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongodb';
import Settings from '@/models/Settings';

export const runtime = 'nodejs';

const DEFAULTS = {
  ceoName: 'Abdul Rehman',
  ceoTitle: 'Founder & CEO',
  ceoBio: 'Multi-disciplinary technologist with deep expertise in QA engineering, AI systems, and full-stack development.',
  ceoPhoto: '',
  contactEmail: 'myjmail92@gmail.com',
  contactPhone: '+92 321 1464482',
  contactCity: 'Pakistan'
};

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json({ settings: DEFAULTS });
  }
  try {
    await dbConnect();
    let doc = await Settings.findOne({ key: 'site' }).lean();
    if (!doc) doc = DEFAULTS;
    return Response.json({ settings: { ...DEFAULTS, ...doc } });
  } catch {
    return Response.json({ settings: DEFAULTS });
  }
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  // Only allow known fields
  const allowed = ['ceoName', 'ceoTitle', 'ceoBio', 'ceoPhoto', 'contactEmail', 'contactPhone', 'contactCity'];
  const updates = {};
  for (const k of allowed) if (k in body) updates[k] = body[k];

  try {
    await dbConnect();
    const doc = await Settings.findOneAndUpdate(
      { key: 'site' },
      { $set: updates, $setOnInsert: { key: 'site' } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return Response.json({ ok: true, settings: doc });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
