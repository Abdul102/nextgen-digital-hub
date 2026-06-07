/**
 * POST /api/linkedin-webhook
 *
 * Called by Zapier (or any webhook) when a new LinkedIn post is published.
 * Protected by a secret key in the Authorization header or ?secret= query param.
 *
 * Expected JSON body (Zapier sends these fields from LinkedIn):
 * {
 *   "text": "Full LinkedIn post text...",
 *   "url": "https://www.linkedin.com/feed/update/...",
 *   "publishedAt": "2026-06-01T10:00:00Z",  // optional
 *   "secret": "YOUR_WEBHOOK_SECRET"           // optional (or use header)
 * }
 */

import { dbConnect } from '@/lib/mongodb';
import Post from '@/models/Post';

export const runtime = 'nodejs';

const THUMB_VARIANTS = ['thumb-1', 'thumb-2', 'thumb-3', 'thumb-4', 'thumb-5', 'thumb-6'];

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function extractTitle(text) {
  // Use first line or first sentence as title (max 100 chars)
  const firstLine = text.split('\n')[0].trim();
  const firstSentence = firstLine.split(/[.!?]/)[0].trim();
  const raw = firstSentence || firstLine;
  return raw.length > 100 ? raw.slice(0, 97) + '…' : raw;
}

function extractExcerpt(text) {
  // Strip emojis-heavy lines, take clean 200 chars
  const cleaned = text.replace(/\n{3,}/g, '\n\n').trim();
  return cleaned.length > 220 ? cleaned.slice(0, 217) + '…' : cleaned;
}

function guessTopic(text) {
  const t = text.toLowerCase();
  if (t.includes('ai') || t.includes('llm') || t.includes('gpt') || t.includes('agent')) return 'AI in QA';
  if (t.includes('test') || t.includes('qa') || t.includes('quality')) return 'QA & Testing';
  if (t.includes('playwright') || t.includes('selenium') || t.includes('cypress')) return 'Automation';
  if (t.includes('api') || t.includes('postman') || t.includes('rest')) return 'API Testing';
  if (t.includes('performance') || t.includes('load') || t.includes('k6')) return 'Performance';
  if (t.includes('ci') || t.includes('cd') || t.includes('pipeline') || t.includes('github')) return 'CI/CD';
  return 'Engineering';
}

function estimateReadTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));

    // Auth: check secret in body OR Authorization header
    const WEBHOOK_SECRET = process.env.LINKEDIN_WEBHOOK_SECRET;
    const provided = body.secret
      || req.headers.get('authorization')?.replace('Bearer ', '')
      || req.headers.get('x-webhook-secret');

    if (WEBHOOK_SECRET && provided !== WEBHOOK_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const text = (body.text || body.content || body.commentary || '').trim();
    if (!text) {
      return Response.json({ error: 'No post text provided' }, { status: 400 });
    }

    const linkedinUrl = body.url || body.postUrl || body.shareUrl || '';
    const linkedinId  = body.id  || body.postId  || linkedinUrl || String(Date.now());

    // Prevent duplicates
    await dbConnect();
    if (linkedinId) {
      const exists = await Post.findOne({ linkedinId });
      if (exists) {
        return Response.json({ ok: true, skipped: true, message: 'Already imported' });
      }
    }

    const title = extractTitle(text);
    const excerpt = extractExcerpt(text);
    const topic = guessTopic(text);
    const readTime = estimateReadTime(text);
    const thumbVariant = THUMB_VARIANTS[Math.floor(Math.random() * THUMB_VARIANTS.length)];
    const baseSlug = slugify(title);
    const slug = baseSlug + '-' + Math.random().toString(36).slice(2, 6);

    await Post.create({
      title,
      slug,
      excerpt,
      body: text,
      topic,
      thumbVariant,
      readTime,
      published: true,
      source: 'linkedin',
      linkedinUrl,
      linkedinId,
    });

    return Response.json({ ok: true, message: 'LinkedIn post saved to blog' });

  } catch (e) {
    console.error('[linkedin-webhook]', e);
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

// Health check
export async function GET(req) {
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret');
  const WEBHOOK_SECRET = process.env.LINKEDIN_WEBHOOK_SECRET;
  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return Response.json({ ok: true, message: 'LinkedIn webhook is active' });
}
