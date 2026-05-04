import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, maxlength: 400 },
    body: { type: String, required: true },
    topic: { type: String, default: 'Engineering' },
    thumbVariant: { type: String, default: 'thumb-1' }, // thumb-1 .. thumb-6
    readTime: { type: String, default: '5 min read' },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
