const mongoose = require('mongoose');

const subscribeSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    status: { type: Number, required: true, default: 0 },
    list: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscribe', subscribeSchema);
