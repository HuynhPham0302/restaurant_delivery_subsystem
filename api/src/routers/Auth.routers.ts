import { Router } from 'express';
import AuthController from '../controllers/Auth.controllers';

const AuthRouter = Router();

AuthRouter.get('/profile', AuthController.getProfile);
AuthRouter.post('/register', AuthController.register);

export default AuthRouter;
