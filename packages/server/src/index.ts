import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from './auth/passport.js';
import * as authController from './auth/auth.controller.js';

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET || 'summer_time_rendering_jwt_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', passport.authenticate('local'), authController.login);

// OAuth Routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.oauthCallback);

app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), authController.oauthCallback);


app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.post('/api/save', (req: Request, res: Response) => {
  const { loopId, position } = req.body;
  console.log(`Saved game state for loop ${loopId}`);
  res.json({ success: true });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
