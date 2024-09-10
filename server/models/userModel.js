const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    pin: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    role: { type: String, enum: ['personal', 'agent'], default: 'personal' },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    balance: { type: Number },
    // created_at: { type: Date, default: Date.now() },
    // updated_at: Date,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
