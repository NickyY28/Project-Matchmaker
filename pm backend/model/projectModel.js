// models/projectModel.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },  // Array of technologies used
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the user who posted it
  createdAt: { type: Date, default: Date.now },
  githubRepoUrl: { type: String }, // Link to the GitHub repo
  contributionGuide: { type: String }, // Basic markdown guide
  repoStats: { // Cached stats from GitHub
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    openIssues: { type: Number, default: 0 },
    lastActivity: Date
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
