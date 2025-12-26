require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ===== MULTER =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// ===== DATABASE CONNECTION =====
if (!process.env.MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI in environment variables");
}

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ===== MODELS =====
const Contact = require('./models/Contact');
const Certificate = require('./models/Certificate');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Profile = require('./models/Profile');
const User = require('./models/User');
const Experience = require('./models/Experience');

// ===== DEFAULT USER SEED =====
mongoose.connection.once('open', async () => {
  try {
    const user = await User.findOne({ username: "demo" });
    if (!user) {
      const hashed = await bcrypt.hash("demo@1234", 10);
      await new User({ username: "demo", password: hashed }).save();
      console.log("👤 Default user created");
    } else console.log("👤 Default user exists");
  } catch (err) {
    console.error("Seed Error:", err);
  }
});

// ===== AUTH =====
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (await User.findOne({ username }))
      return res.status(400).json({ error: "User exists" });

    await new User({
      username,
      password: await bcrypt.hash(password, 10)
    }).save();

    res.status(201).json({ message: "Registered" });
  } catch {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (!await bcrypt.compare(req.body.password, user.password))
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "secret"
    );

    res.json({ token, username: user.username });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

// ===== CONTACT =====
app.post('/api/contact', async (req, res) => {
  try {
    await new Contact(req.body).save();
    res.status(201).json({ message: "Message sent" });
  } catch {
    res.status(500).json({ error: "Failed to send" });
  }
});

// ===== CERTIFICATES =====
app.get('/api/certificates', async (req, res) => {
  try {
    res.json(await Certificate.find().lean().sort({ createdAt: -1 }));
  } catch {
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
});

app.post('/api/certificates',
  authenticateToken,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file" });

      const cert = await new Certificate({
        ...req.body,
        fileUrl: `/uploads/${req.file.filename}`
      }).save();

      res.status(201).json(cert);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to add certificate" });
    }
  }
);

// ===== SKILLS =====
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find().lean().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    console.error("🔥 Skills API Error:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

app.post('/api/skills', authenticateToken, async (req, res) => {
  try {
    const skill = await new Skill(req.body).save();
    res.status(201).json(skill);
  } catch {
    res.status(500).json({ error: "Failed to add skill" });
  }
});

// ===== PROJECTS =====
app.get('/api/projects', async (req, res) => {
  try {
    res.json(await Project.find().lean().sort({ createdAt: -1 }));
  } catch {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.post('/api/projects',
  authenticateToken,
  upload.single('image'),
  async (req, res) => {
    try {
      const proj = await new Project({
        ...req.body,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : ""
      }).save();

      res.status(201).json(proj);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to add project" });
    }
  }
);

// ===== EXPERIENCE =====
app.get('/api/experience', async (req, res) => {
  try {
    res.json(await Experience.find().lean().sort({ createdAt: -1 }));
  } catch {
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
});

app.post('/api/experience',
  authenticateToken,
  upload.single('logo'),
  async (req, res) => {
    try {
      const exp = await new Experience({
        ...req.body,
        logoUrl: req.file ? `/uploads/${req.file.filename}` : ""
      }).save();

      res.status(201).json(exp);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to add experience" });
    }
  }
);

// ===== PROFILE =====
app.get('/api/profile', async (req, res) => {
  try {
    res.json(await Profile.findOne().lean().sort({ updatedAt: -1 }));
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.post(
  '/api/profile',
  authenticateToken,
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
        updatedAt: new Date(),
        profileImageUrl: req.files?.profileImage
          ? `/uploads/${req.files.profileImage[0].filename}`
          : undefined,
        resumeUrl: req.files?.resume
          ? `/uploads/${req.files.resume[0].filename}`
          : undefined
      };

      const profile = await Profile.findOneAndUpdate(
        {},
        updateData,
        { new: true, upsert: true }
      );

      res.json(profile);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to save profile" });
    }
  }
);

// ===== HEALTH CHECK =====
app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

module.exports = app;
