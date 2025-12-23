const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tagline: { type: String }, // e.g., "Full Stack Developer | Student"
    aboutBio: { type: String },
    email: { type: String },
    phone: { type: String },
    githubLink: { type: String },
    linkedinLink: { type: String },
    instagramLink: { type: String },
    profileImageUrl: { type: String },
    resumeUrl: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);
