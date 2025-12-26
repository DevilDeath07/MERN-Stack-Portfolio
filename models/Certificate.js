const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);
