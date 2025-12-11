// routes/projectRoutes.js
import express from 'express';
import Project from '../model/projectModel.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Make sure only logged-in users can submit projects

const router = express.Router();

// Submit a new project
router.post('/submit', authMiddleware, async (req, res) => {
  const { name, description, techStack } = req.body;

  if (!name || !description || !techStack) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newProject = new Project({
    name,
    description,
    techStack,
    owner: req.user._id,  // Attach the user who submitted the project
  });

  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: "Error submitting project", error: err });
  }
});

// Get logged-in user's projects
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your projects" });
  }
});

// Get all projects (to display on frontend)
router.get('/all', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('owner', 'username avatarUrl')  // Populate the 'owner' field with username and avatar
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

export default router;
