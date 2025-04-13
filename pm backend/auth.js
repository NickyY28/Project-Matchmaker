import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import dotenv from 'dotenv';
import User from './model/User.js';
dotenv.config(); // MUST be at the top before using process.env

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
  
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value || "Email not public",
          avatarUrl: profile.photos?.[0]?.value || ""
        });
      }
  
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));


  passport.serializeUser((user, done) => {
    done(null, user.id); // MongoDB _id
  });
  
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  