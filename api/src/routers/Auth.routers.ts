import { Router } from 'express';
import AuthController from '../controllers/Auth.controllers';

const AuthRouter = Router();
const authController = new AuthController();

AuthRouter.get('/profile', authController.getProfile);

export default AuthRouter;
