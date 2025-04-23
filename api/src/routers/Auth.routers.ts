import { Router } from 'express';
import AuthController from '../controllers/Auth.controllers';

const AuthRouter = Router();

AuthRouter.get('/profile', AuthController.getProfile);
AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);

export default AuthRouter;
