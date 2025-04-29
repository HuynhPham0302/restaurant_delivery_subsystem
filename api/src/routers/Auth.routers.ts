import { Router } from 'express';
import AuthController from '../controllers/Auth.controllers';
import { BearerMiddle, GoogleMiddle, GoogleMiddleCallBack } from '../middlewares/Passport.middleware';

const AuthRouter = Router();

// Local Strategy (Email & Password)
AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);

// Bearer Strategy (Token)
AuthRouter.get('/me', BearerMiddle, AuthController.me);

// Redirect to Google for login
AuthRouter.get('/google', GoogleMiddle, (_, res) => {
  res.send('Redirect to Google for login');
});

// Verify data user from google provider
AuthRouter.get('/google/callback', GoogleMiddleCallBack, AuthController.googleProvider);

AuthRouter.get('/user', AuthController.getAllUser);

AuthRouter.put('/user/:id', AuthController.updateUser);

export default AuthRouter;
