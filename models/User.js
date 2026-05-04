import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, default: 'Admin' },
    role: { type: String, default: 'admin' }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
