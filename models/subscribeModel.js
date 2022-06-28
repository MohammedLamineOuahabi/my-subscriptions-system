import mongoose from 'mongoose';

const subscribeSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    status: { type: Number, required: true, default: 0 },
    list: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Subscribe', subscribeSchema);
