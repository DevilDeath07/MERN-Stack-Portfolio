require('dotenv').config();
// Trigger restart for .env update
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
const Contact = require('./models/Contact');
const Certificate = require('./models/Certificate');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Profile = require('./models/Profile');
const User = require('./models/User');
const Experience = require('./models/Experience');

// --- SEED LOGIN ---
const seedDefaultUser = async () => {
    try {
        const existingUser = await User.findOne({ username: 'demo' });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash('demo@1234', 10);
            const newUser = new User({ username: 'demo', password: hashedPassword });
            await newUser.save();
            console.log('Default user "demo" created successfully.');
        } else {
            console.log('Default user "demo" already exists.');
        }
    } catch (error) {
        console.error('Error creating default user:', error);
    }
};
mongoose.connection.once('open', seedDefaultUser);

// --- AUTH ROUTES ---
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'secretkey');
        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Contact Route (Public)
app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Certificates Route
app.get('/api/certificates', async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch certificates' });
    }
});

// Upload Certificate Route (Protected)
app.post('/api/certificates', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { title, issuer, year, description } = req.body;
        const fileUrl = `/uploads/${req.file.filename}`;

        const newCert = new Certificate({
            title,
            issuer,
            year,
            description,
            fileUrl
        });

        await newCert.save();
        res.status(201).json(newCert);
    } catch (error) {
        console.error("Error saving certificate:", error);
        res.status(500).json({ error: 'Failed to add certificate' });
    }
});

// --- SKILLS ROUTES ---
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

app.post('/api/skills', authenticateToken, async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add skill' });
    }
});

// --- PROJECTS ROUTES ---
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

app.post('/api/projects', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        console.log('--- Incoming Project Data ---');
        console.log('Body:', req.body);
        const { title, description, technologies, link, liveLink } = req.body;
        let fileUrl = '';

        if (req.file) {
            fileUrl = `/uploads/${req.file.filename}`;
        }

        const newProject = new Project({
            title,
            description,
            technologies,
            link,
            liveLink,
            fileUrl
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error saving project:", error);
        res.status(500).json({ error: 'Failed to add project' });
    }
});

// --- EXPERIENCE ROUTES ---
app.get('/api/experience', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch experiences' });
    }
});

app.post('/api/experience', authenticateToken, upload.single('logo'), async (req, res) => {
    try {
        const { role, company, period, description } = req.body;
        let logoUrl = '';

        if (req.file) {
            logoUrl = `/uploads/${req.file.filename}`;
        }

        const newExperience = new Experience({
            role,
            company,
            period,
            description,
            logoUrl
        });

        await newExperience.save();
        res.status(201).json(newExperience);
    } catch (error) {
        console.error("Error saving experience:", error);
        res.status(500).json({ error: 'Failed to add experience' });
    }
});

// --- PROFILE ROUTES ---
app.get('/api/profile', async (req, res) => {
    try {
        // Return the most recent profile (or the only one)
        const profile = await Profile.findOne().sort({ updatedAt: -1 });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

app.post('/api/profile', authenticateToken, upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
    try {
        const { name, tagline, aboutBio, email, phone, githubLink, linkedinLink, instagramLink } = req.body;

        const updateData = {
            name, tagline, aboutBio, email, phone, githubLink, linkedinLink, instagramLink,
            updatedAt: Date.now()
        };

        if (req.files['profileImage']) {
            updateData.profileImageUrl = `/uploads/${req.files['profileImage'][0].filename}`;
        }
        if (req.files['resume']) {
            updateData.resumeUrl = `/uploads/${req.files['resume'][0].filename}`;
        }

        // Upsert: Update if exists, otherwise create
        const profile = await Profile.findOneAndUpdate({}, updateData, { new: true, upsert: true });

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).json({ error: 'Failed to save profile request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
