// routes/authRoutes.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173/dashboard');
});

router.get('/user', (req, res) => {
  if (req.user) {
    // Send back user details that you need for the frontend
    return res.json({
      username: req.user.username,
      avatarUrl: req.user.avatarUrl,
      email: req.user.email,
      photos: req.user.photos // Or any other details you need from GitHub
    });
  } else {
    return res.status(401).json({ message: "Not logged in" });
  }
});


router.get('/check', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('http://localhost:5173');  // Redirect to homepage
  });
});



export default router;
