// Code: passport middleware
// This snippet is a middleware that uses passport to authenticate users using the Bearer token and Google OAuth2.0. It also uses the JWT token to verify the user's identity.

import passport from 'passport';
import BearerPassport from 'passport-http-bearer';
import GooglePassport from 'passport-google-oauth20';
import prismaInstance from '../configs/database.config';
import jwt, { TJwtPayload } from '../utils/Jwt.utils';

const {
  GOOGLE_CLIENT_ID = 'abc',
  GOOGLE_CLIENT_SECRET = 'ABC',
  CLIENT_HOSTNAME = 'http://localhost:5173',
} = process.env;

const ProfileModel = prismaInstance.profile;

const BearerStrategy = BearerPassport.Strategy;
const GoogleStrategy = GooglePassport.Strategy;

// Middleware for Bearer token authentication
const BearerMiddle = passport.authenticate('bearer', { session: false, failWithError: true });

// Middleware for Google OAuth2.0 authentication
const GoogleMiddle = passport.authenticate('google', {
  session: false,
  failWithError: true,
  scope: ['profile', 'email'],
});

// Middleware for Google OAuth2.0 callback
const GoogleMiddleCallBack = passport.authenticate('google', {
  session: false,
  failWithError: true,
});

// Configure Strategies
passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = jwt.verify(token) as TJwtPayload;
      const profile = await ProfileModel.findUnique({
        where: {
          id: payload.id,
          email: payload.email,
        },
      });
      if (!profile) {
        return done(null, false);
      }
      return done(null, profile);
    } catch (error) {
      return done(error, false);
    }
  }),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CLIENT_HOSTNAME}/auth/callback/google`,
    },
    async function (_, __, profile, done) {
      try {
        const email = profile.emails![0].value;
        const user = await ProfileModel.findUnique({
          where: {
            email,
            provider: 'google',
          },
        });
        if (user) {
          const token = jwt.sign({
            id: user.id,
            provider: user.provider,
            role: user.role,
            email: user.email,
          } as TJwtPayload);
          return done(null, { ...user, token });
        } else {
          const newGoogleUser = await ProfileModel.create({
            data: {
              email,
              provider: 'google',
              avatar: profile.photos![0].value,
              user: {
                create: {
                  fullName: profile.displayName,
                  username: profile.displayName,
                },
              },
            },
          });
          const token = jwt.sign({
            id: newGoogleUser.id,
            provider: newGoogleUser.provider,
            role: newGoogleUser.role,
            email: newGoogleUser.email,
          } as TJwtPayload);
          return done(null, { ...newGoogleUser, token });
        }
      } catch (error) {
        return done(error as Error, false);
      }
    },
  ),
);

export { BearerMiddle, GoogleMiddle, GoogleMiddleCallBack };
