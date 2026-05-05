import mongoose from 'mongoose';

// Single document model — store ALL site settings as one row.
// We always upsert/find with `{ key: 'site' }`.
const SettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    ceoName: { type: String, default: 'Abdul Rehman' },
    ceoTitle: { type: String, default: 'Founder & CEO' },
    ceoBio: { type: String, default: '' },
    ceoPhoto: { type: String, default: '' }, // base64 data URL
    contactEmail: { type: String, default: 'myjmail92@gmail.com' },
    contactPhone: { type: String, default: '+92 321 1464482' },
    contactCity: { type: String, default: 'Pakistan' }
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
