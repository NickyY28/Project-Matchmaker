// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String },
  displayName: { type: String },
  avatar: { type: String },
  email: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;