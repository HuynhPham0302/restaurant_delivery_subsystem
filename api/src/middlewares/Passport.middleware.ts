import passport from 'passport';
import BearerPassport from 'passport-http-bearer';

const BearerStrategy = BearerPassport.Strategy;

const MiddleBearerPassport = passport.authenticate('bearer', { session: false, failWithError: true });
const MiddleGooglePassport = passport.authenticate('google', { session: false, failWithError: true });

passport.use(
  new BearerStrategy((token, done) => {
    if (token === '123456') {
      return done(null, { token: '123456' });
    } else {
      return done(null, false);
    }
  }),
);

export { MiddleBearerPassport };
