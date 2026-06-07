import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, maxlength: 400 },
    body: { type: String, required: true },
    topic: { type: String, default: 'Engineering' },
    thumbVariant: { type: String, default: 'thumb-1' }, // thumb-1 .. thumb-6
    coverImage: { type: String, default: '' }, // base64 data URL (optional)
    readTime: { type: String, default: '5 min read' },
    published: { type: Boolean, default: true },
    source: { type: String, default: 'manual' }, // 'manual' | 'linkedin'
    linkedinUrl: { type: String, default: '' },
    linkedinId: { type: String, default: '', sparse: true }
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
