import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './auth.js';
import authRoute from './routes/authRoutes.js'
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5173',
     credentials: true }));
app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Server is live'));

app.use('/auth', authRoute);
app.use('/api/projects', projectRoutes);

connectDB()
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
