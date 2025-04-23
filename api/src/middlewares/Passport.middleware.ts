import passport from 'passport';
import BearerPassport from 'passport-http-bearer';
import GooglePassport from 'passport-google-oauth20';
import prismaInstance from '../configs/database.config';
import jwt, { TJwtPayload } from '../utils/Jwt.utils';

const { GOOGLE_CLIENT_ID = 'abc', GOOGLE_CLIENT_SECRET = 'ABC' } = process.env;

const ProfileModel = prismaInstance.profile;

const BearerStrategy = BearerPassport.Strategy;
const GoogleStrategy = GooglePassport.Strategy;

const BearerMiddle = passport.authenticate('bearer', { session: false, failWithError: true });
const GoogleMiddle = passport.authenticate('google', {
  session: false,
  failWithError: true,
  scope: ['profile', 'email'],
});
const GoogleMiddleCallBack = passport.authenticate('google', {
  session: false,
  failWithError: true,
});

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
