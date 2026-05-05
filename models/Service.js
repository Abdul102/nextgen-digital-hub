import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    icon: { type: String, default: 'circle' }, // simple icon key
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
