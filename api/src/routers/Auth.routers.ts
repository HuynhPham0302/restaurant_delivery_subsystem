import { Router } from 'express';
import AuthController from '../controllers/Auth.controllers';
import { MiddleBearerPassport } from '../middlewares/Passport.middleware';

const AuthRouter = Router();

AuthRouter.get('/profile', AuthController.getProfile);
AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', MiddleBearerPassport, AuthController.login);

export default AuthRouter;
