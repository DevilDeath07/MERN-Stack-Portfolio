const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: String }, // Comma separated
    link: { type: String }, // e.g., GitHub link
    liveLink: { type: String }, // e.g., Live Demo link
    fileUrl: { type: String }, // Project image
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
