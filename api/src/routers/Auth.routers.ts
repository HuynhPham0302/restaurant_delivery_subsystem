import { Router } from 'express';
import AuthController from '../controllers/Auth.controllers';
import { BearerMiddle, GoogleMiddle, GoogleMiddleCallBack } from '../middlewares/Passport.middleware';

const AuthRouter = Router();

AuthRouter.get('/profile', BearerMiddle, AuthController.getProfile);
AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);
AuthRouter.get('/google', GoogleMiddle, AuthController.googleProvider);
AuthRouter.get('/google/callback', GoogleMiddleCallBack, AuthController.googleProvider);

export default AuthRouter;
