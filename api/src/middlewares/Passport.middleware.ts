// Code: passport middleware
// This snippet is a middleware that uses passport to authenticate users using the Bearer token and Google OAuth2.0. It also uses the JWT token to verify the user's identity.

import passport from 'passport';
import BearerPassport from 'passport-http-bearer';
import GooglePassport from 'passport-google-oauth20';
import prismaInstance from '../configs/database.config';
import jwt, { TJwtPayload } from '../utils/Jwt.utils';

const { GOOGLE_CLIENT_ID = 'abc', GOOGLE_CLIENT_SECRET = 'ABC' } = process.env;

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
  new BearerStrategy((token, done) => {
    try {
      const payload = jwt.verify(token) as TJwtPayload;
      const profile = ProfileModel.findUnique({
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
      callbackURL: 'http://localhost:4000/v1/api/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    },
  ),
);

export { BearerMiddle, GoogleMiddle, GoogleMiddleCallBack };
