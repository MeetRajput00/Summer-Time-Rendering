import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.password) {
          return done(null, false, { message: 'Please log in with your social provider.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await prisma.user.findUnique({
            where: { providerId: profile.id },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                username: profile.displayName || profile.emails?.[0].value || `google_${profile.id}`,
                email: profile.emails?.[0].value,
                avatarUrl: profile.photos?.[0].value,
                provider: 'google',
                providerId: profile.id,
              },
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/api/auth/github/callback',
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          let user = await prisma.user.findUnique({
            where: { providerId: profile.id },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                username: profile.username || profile.displayName || `github_${profile.id}`,
                email: profile.emails?.[0]?.value,
                avatarUrl: profile.photos?.[0]?.value,
                provider: 'github',
                providerId: profile.id,
              },
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
