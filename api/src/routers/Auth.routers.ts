import { Router } from 'express';
import AuthController from '../controllers/Auth.controllers';
import { BearerMiddle, GoogleMiddle, GoogleMiddleCallBack } from '../middlewares/Passport.middleware';

const AuthRouter = Router();

// Local Strategy (Email & Password)
AuthRouter.get('/profile', BearerMiddle, AuthController.getProfile);
AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);

// Redirect to Google for login
AuthRouter.get('/google', GoogleMiddle, (_, res) => {
  res.send('Redirect to Google for login');
});

// Verify data user from google provider
AuthRouter.get('/google/callback', GoogleMiddleCallBack, AuthController.googleProvider);

export default AuthRouter;
