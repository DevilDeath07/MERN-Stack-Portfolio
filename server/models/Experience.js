const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String }, // Optional company logo
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Experience', experienceSchema);
