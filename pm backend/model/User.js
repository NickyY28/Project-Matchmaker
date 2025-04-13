import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: String,
  displayName: String,
  email: String,
  avatarUrl: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

