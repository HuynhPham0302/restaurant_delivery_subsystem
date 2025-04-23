import { Router } from 'express';
import AuthController from '../controllers/Auth.controllers';
import { BearerMiddle, GoogleMiddle, GoogleMiddleCallBack } from '../middlewares/Passport.middleware';

const AuthRouter = Router();

// Local Strategy (Email & Password)
AuthRouter.get('/profile', BearerMiddle, AuthController.getProfile);
AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);

// Google OAuth2.0
AuthRouter.get('/google', GoogleMiddle, AuthController.googleProvider);

// Redirect to Client after get data from Google
AuthRouter.get('/google/callback', GoogleMiddleCallBack, AuthController.googleProvider);

export default AuthRouter;
