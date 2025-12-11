import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: String,
  displayName: String,
  email: String,
  avatarUrl: String,
  skills: [String], // Array of skills/languages
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // Saved projects
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

