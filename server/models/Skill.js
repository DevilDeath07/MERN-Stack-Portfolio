const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true },
    category: { type: String },
    description: { type: String }
  },
  { timestamps: true }   // <<< auto adds createdAt & updatedAt
);

module.exports = mongoose.model('Skill', skillSchema);
