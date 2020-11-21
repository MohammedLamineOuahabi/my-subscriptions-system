const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    list: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
